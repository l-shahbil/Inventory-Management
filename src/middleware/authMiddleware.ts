import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../services/Auth/authService';
import { AuthRequest } from '../types/authRequest';

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: 'Unauthorized' }); 
    return;
  }
  try {
    const decoded = verifyToken(token);
    req.user = decoded as { id: string; role: string; email: string };
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export const authorize = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user!.role)) {
      res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
};
