import { Express, Request, Response, NextFunction } from 'express';
import { storage } from './storage';

export interface AuditLog {
  userId?: number;
  action: string;
  resource: string;
  resourceId?: string;
  details?: any;
  ipAddress: string;
  userAgent: string;
  timestamp: Date;
  success: boolean;
  errorMessage?: string;
}

// Store audit logs in memory for now (could be moved to database)
const auditLogs: AuditLog[] = [];

export function logAuditEvent(event: Omit<AuditLog, 'timestamp'>) {
  const auditEvent: AuditLog = {
    ...event,
    timestamp: new Date()
  };
  
  auditLogs.push(auditEvent);
  console.log(`[AUDIT] ${auditEvent.action} on ${auditEvent.resource}`, auditEvent);
  
  // Keep only last 1000 logs in memory
  if (auditLogs.length > 1000) {
    auditLogs.shift();
  }
}

// Middleware to automatically log API requests
export function auditMiddleware() {
  return (req: any, res: Response, next: NextFunction) => {
    const originalSend = res.send;
    const originalJson = res.json;
    
    let responseBody: any;
    
    res.send = function(body) {
      responseBody = body;
      return originalSend.call(this, body);
    };
    
    res.json = function(body) {
      responseBody = body;
      return originalJson.call(this, body);
    };
    
    res.on('finish', () => {
      // Only log sensitive operations
      if (shouldLogRequest(req)) {
        const success = res.statusCode < 400;
        
        logAuditEvent({
          userId: req.user?.id,
          action: getActionFromRequest(req),
          resource: getResourceFromPath(req.path),
          resourceId: req.params.id,
          details: {
            method: req.method,
            path: req.path,
            query: req.query,
            statusCode: res.statusCode,
            ...(req.method !== 'GET' && { body: req.body })
          },
          ipAddress: req.ip || req.connection.remoteAddress,
          userAgent: req.get('User-Agent') || '',
          success,
          errorMessage: success ? undefined : (responseBody?.message || responseBody?.error)
        });
      }
    });
    
    next();
  };
}

function shouldLogRequest(req: Request): boolean {
  const sensitiveEndpoints = [
    '/api/login',
    '/api/logout',
    '/api/register',
    '/api/articles',
    '/api/services',
    '/api/users',
    '/api/settings',
    '/api/media-files'
  ];
  
  // Log all POST, PUT, DELETE requests to sensitive endpoints
  if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(req.method)) {
    return sensitiveEndpoints.some(endpoint => req.path.startsWith(endpoint));
  }
  
  // Log login attempts
  if (req.path === '/api/login' || req.path === '/api/logout') {
    return true;
  }
  
  return false;
}

function getActionFromRequest(req: Request): string {
  const method = req.method;
  const path = req.path;
  
  if (path.includes('/login')) return 'LOGIN_ATTEMPT';
  if (path.includes('/logout')) return 'LOGOUT';
  if (path.includes('/register')) return 'REGISTER';
  
  switch (method) {
    case 'POST': return 'CREATE';
    case 'PUT':
    case 'PATCH': return 'UPDATE';
    case 'DELETE': return 'DELETE';
    case 'GET': return 'READ';
    default: return method;
  }
}

function getResourceFromPath(path: string): string {
  const segments = path.split('/').filter(Boolean);
  if (segments.length >= 2) {
    return segments[1]; // e.g., /api/articles -> articles
  }
  return path;
}

// Get audit logs (for admin dashboard)
export function getAuditLogs(filters?: {
  userId?: number;
  action?: string;
  resource?: string;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
}): AuditLog[] {
  let filteredLogs = [...auditLogs];
  
  if (filters) {
    if (filters.userId) {
      filteredLogs = filteredLogs.filter(log => log.userId === filters.userId);
    }
    if (filters.action) {
      filteredLogs = filteredLogs.filter(log => log.action === filters.action);
    }
    if (filters.resource) {
      filteredLogs = filteredLogs.filter(log => log.resource === filters.resource);
    }
    if (filters.startDate) {
      filteredLogs = filteredLogs.filter(log => log.timestamp >= filters.startDate!);
    }
    if (filters.endDate) {
      filteredLogs = filteredLogs.filter(log => log.timestamp <= filters.endDate!);
    }
  }
  
  // Sort by timestamp (newest first)
  filteredLogs.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  
  // Apply limit
  if (filters?.limit) {
    filteredLogs = filteredLogs.slice(0, filters.limit);
  }
  
  return filteredLogs;
}

// Setup audit logging for the app
export function setupAuditLogging(app: Express) {
  app.use(auditMiddleware());
  
  // Audit logs endpoint (protected)
  app.get('/api/audit-logs', (req: any, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    const filters = {
      action: req.query.action as string,
      resource: req.query.resource as string,
      limit: req.query.limit ? parseInt(req.query.limit as string) : 100
    };
    
    const logs = getAuditLogs(filters);
    res.json(logs);
  });
}