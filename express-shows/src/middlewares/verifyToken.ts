import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header('auth-token');
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET || '123456');
    next();
  } catch (error) {
    res.status(400).send('Invalid token.');
  }
};
