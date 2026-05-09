import { Request, Response, NextFunction } from 'express';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// 8-16 characters, 1 uppercase, 1 special character
const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,16}$/;

export const validateSignup = (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password, address } = req.body;

  if (!name || name.length < 20 || name.length > 60) {
    return res.status(400).json({ message: 'Name must be between 20 and 60 characters.' });
  }

  if (!address || address.length > 400) {
    return res.status(400).json({ message: 'Address must not exceed 400 characters.' });
  }

  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format.' });
  }

  if (!password || !passwordRegex.test(password)) {
    return res.status(400).json({ message: 'Password must be 8-16 characters long, include at least one uppercase letter and one special character.' });
  }

  next();
};

export const validateUserUpdate = (req: Request, res: Response, next: NextFunction) => {
  const { name, email, address } = req.body;
  if (name && (name.length < 20 || name.length > 60)) {
    return res.status(400).json({ message: 'Name must be between 20 and 60 characters.' });
  }
  if (address && address.length > 400) {
    return res.status(400).json({ message: 'Address must not exceed 400 characters.' });
  }
  if (email && !emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format.' });
  }
  next();
};

export const validateStore = (req: Request, res: Response, next: NextFunction) => {
  const { name, email, address } = req.body;
  if (!name || name.length < 3 || name.length > 60) {
    // Store name might have different requirements, but let's say 3-60
    return res.status(400).json({ message: 'Store name must be between 3 and 60 characters.' });
  }
  if (!address || address.length > 400) {
    return res.status(400).json({ message: 'Address must not exceed 400 characters.' });
  }
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format.' });
  }
  next();
};
