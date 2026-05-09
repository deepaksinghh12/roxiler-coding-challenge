import { Router } from 'express';
import { dashboard } from '../controllers/owner.controller';
import { authenticate } from '../middlewares/auth.middleware';

export const ownerRouter = Router();

ownerRouter.get('/dashboard', authenticate(['owner']), dashboard);
