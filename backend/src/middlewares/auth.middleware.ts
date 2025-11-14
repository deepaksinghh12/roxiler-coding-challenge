import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export interface AuthRequest extends Request { user?: any; }
export const authenticate = (roles?: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const header = req.headers.authorization as string;
    if (!header) return res.status(401).json({ message: 'No token' });
    const token = header.replace('Bearer ', '');
    try {
      const payload: any = jwt.verify(token, process.env.JWT_SECRET || 'verysecret');
      if (roles && !roles.includes(payload.role)) return res.status(403).json({ message: 'Forbidden' });
      req.user = payload;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
};
