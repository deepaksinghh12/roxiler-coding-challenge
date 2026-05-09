import { Router } from 'express';
import { dashboard, createUser, createStore, listStores, listUsers } from '../controllers/admin.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { validateSignup, validateStore } from '../middlewares/validation.middleware';

export const adminRouter = Router();

adminRouter.get('/dashboard', authenticate(['admin']), dashboard);
adminRouter.post('/users', authenticate(['admin']), validateSignup, createUser);
adminRouter.post('/stores', authenticate(['admin']), validateStore, createStore);
adminRouter.get('/stores', authenticate(['admin']), listStores);
adminRouter.get('/users', authenticate(['admin']), listUsers);
