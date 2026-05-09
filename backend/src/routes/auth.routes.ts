import { Router } from 'express';
import { signup, login } from '../controllers/auth.controller';
import { validateSignup } from '../middlewares/validation.middleware';

export const authRouter = Router();

/**
 * POST /api/auth/signup
 */
authRouter.post('/signup', validateSignup, signup);

/**
 * POST /api/auth/login
 */
authRouter.post('/login', login);
