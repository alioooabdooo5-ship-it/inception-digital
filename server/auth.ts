import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Express } from "express";
import session from "express-session";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { storage } from "./storage";
import { User as SelectUser } from "@shared/schema";
import { loginLimiter, loginSlowDown } from "./security";
import { logAuditEvent } from "./audit";

declare global {
  namespace Express {
    interface User extends SelectUser {}
  }
}

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function comparePasswords(supplied: string, stored: string) {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
  return timingSafeEqual(hashedBuf, suppliedBuf);
}

export function setupAuth(app: Express) {
  const sessionSettings: session.SessionOptions = {
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    store: storage.sessionStore,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      sameSite: 'strict',
    },
    rolling: true, // Reset expiration on activity
    name: 'sessionId', // Change default session name
  };

  app.set("trust proxy", 1);
  app.use(session(sessionSettings));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await storage.getUserByUsername(username);
        if (!user || !(await comparePasswords(password, user.password))) {
          // Log failed login attempt
          logAuditEvent({
            action: 'LOGIN_FAILED',
            resource: 'auth',
            details: { username, reason: 'Invalid credentials' },
            ipAddress: 'unknown', // Will be updated in route handler
            userAgent: 'unknown',
            success: false,
            errorMessage: 'Invalid username or password'
          });
          return done(null, false);
        } else {
          // Log successful login
          logAuditEvent({
            userId: user.id,
            action: 'LOGIN_SUCCESS',
            resource: 'auth',
            details: { username },
            ipAddress: 'unknown',
            userAgent: 'unknown',
            success: true
          });
          return done(null, user);
        }
      } catch (error) {
        return done(error);
      }
    }),
  );

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id: number, done) => {
    const user = await storage.getUser(id);
    done(null, user);
  });

  app.post("/api/register", async (req, res, next) => {
    const existingUser = await storage.getUserByUsername(req.body.username);
    if (existingUser) {
      return res.status(400).send("Username already exists");
    }

    const user = await storage.createUser({
      ...req.body,
      password: await hashPassword(req.body.password),
    });

    req.login(user, (err) => {
      if (err) return next(err);
      res.status(201).json(user);
    });
  });

  app.post("/api/login", loginLimiter, loginSlowDown, (req, res, next) => {
    passport.authenticate("local", (err: any, user: any, info: any) => {
      if (err) {
        logAuditEvent({
          action: 'LOGIN_ERROR',
          resource: 'auth',
          details: { username: req.body.username, error: err.message },
          ipAddress: req.ip || req.connection.remoteAddress || 'unknown',
          userAgent: req.get('User-Agent') || 'unknown',
          success: false,
          errorMessage: err.message
        });
        return next(err);
      }
      
      if (!user) {
        logAuditEvent({
          action: 'LOGIN_FAILED',
          resource: 'auth',
          details: { username: req.body.username, reason: 'Invalid credentials' },
          ipAddress: req.ip || req.connection.remoteAddress || 'unknown',
          userAgent: req.get('User-Agent') || 'unknown',
          success: false,
          errorMessage: 'Invalid username or password'
        });
        return res.status(401).json({ 
          message: "اسم المستخدم أو كلمة المرور غير صحيحة" 
        });
      }
      
      req.logIn(user, (err: any) => {
        if (err) {
          return next(err);
        }
        
        // Regenerate session ID for security
        req.session.regenerate((err: any) => {
          if (err) {
            return next(err);
          }
          
          logAuditEvent({
            userId: user.id,
            action: 'LOGIN_SUCCESS',
            resource: 'auth',
            details: { username: user.username },
            ipAddress: req.ip || req.connection.remoteAddress || 'unknown',
            userAgent: req.get('User-Agent') || 'unknown',
            success: true
          });
          
          res.status(200).json(user);
        });
      });
    })(req, res, next);
  });

  app.post("/api/logout", (req: any, res, next) => {
    const userId = req.user?.id;
    const username = req.user?.username;
    
    req.logout((err: any) => {
      if (err) return next(err);
      
      // Destroy session completely
      req.session.destroy((err: any) => {
        if (err) {
          console.error('Session destruction error:', err);
        }
        
        logAuditEvent({
          userId,
          action: 'LOGOUT',
          resource: 'auth',
          details: { username },
          ipAddress: req.ip || req.connection.remoteAddress || 'unknown',
          userAgent: req.get('User-Agent') || 'unknown',
          success: true
        });
        
        res.clearCookie('sessionId');
        res.sendStatus(200);
      });
    });
  });

  app.get("/api/user", (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    res.json(req.user);
  });
}

// Middleware to require authentication for API endpoints
export function requireAuth(req: any, res: any, next: any) {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Authentication required" });
  }
  next();
}

// Middleware to protect admin pages (redirect unauthorized users)
export function requireAuthForPages(req: any, res: any, next: any) {
  // Only protect admin routes
  if (req.originalUrl.startsWith('/admin')) {
    if (!req.isAuthenticated()) {
      // Redirect to auth page instead of returning JSON
      return res.redirect('/auth');
    }
  }
  next();
}