import { Express, Request, Response, NextFunction } from 'express';
import { randomBytes } from 'crypto';

interface CSRFToken {
  token: string;
  timestamp: number;
}

// Store CSRF tokens temporarily (in production, use Redis or database)
const csrfTokens = new Map<string, CSRFToken>();

// Clean up expired tokens periodically
setInterval(() => {
  const now = Date.now();
  const expireTime = 60 * 60 * 1000; // 1 hour
  
  for (const [sessionId, tokenData] of csrfTokens.entries()) {
    if (now - tokenData.timestamp > expireTime) {
      csrfTokens.delete(sessionId);
    }
  }
}, 15 * 60 * 1000); // Clean every 15 minutes

export function generateCSRFToken(sessionId: string): string {
  const token = randomBytes(32).toString('hex');
  csrfTokens.set(sessionId, {
    token,
    timestamp: Date.now()
  });
  return token;
}

export function validateCSRFToken(sessionId: string, token: string): boolean {
  const storedToken = csrfTokens.get(sessionId);
  if (!storedToken) {
    return false;
  }
  
  // Check if token is expired (1 hour)
  const expireTime = 60 * 60 * 1000;
  if (Date.now() - storedToken.timestamp > expireTime) {
    csrfTokens.delete(sessionId);
    return false;
  }
  
  return storedToken.token === token;
}

export function csrfProtection() {
  return (req: any, res: Response, next: NextFunction) => {
    // Skip CSRF for GET, HEAD, OPTIONS requests
    if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
      return next();
    }
    
    // Skip CSRF for login endpoint (handled separately)
    if (req.path === '/api/login' || req.path === '/api/register') {
      return next();
    }
    
    // Check for authentication first
    if (!req.isAuthenticated() || !req.session) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    const sessionId = req.session.id;
    const token = req.headers['x-csrf-token'] || req.body._csrf;
    
    if (!token || !validateCSRFToken(sessionId, token)) {
      return res.status(403).json({ 
        message: 'CSRF token mismatch. Please refresh the page and try again.',
        code: 'CSRF_MISMATCH'
      });
    }
    
    next();
  };
}

export function setupCSRF(app: Express) {
  // Endpoint to get CSRF token
  app.get('/api/csrf-token', (req: any, res) => {
    if (!req.session) {
      return res.status(401).json({ message: 'Session required' });
    }
    
    const token = generateCSRFToken(req.session.id);
    res.json({ csrfToken: token });
  });
  
  // Apply CSRF protection to all API routes except GET/HEAD/OPTIONS
  app.use('/api', csrfProtection());
}