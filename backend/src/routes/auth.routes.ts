import { Router } from 'express';
import { signup, login } from '../controllers/auth.controller';
export const authRouter = Router();
/**
 * POST /api/auth/signup
 */
authRouter.post('/signup', signup);
/**
 * POST /api/auth/login
 */
authRouter.post('/login', login);
