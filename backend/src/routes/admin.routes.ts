import { Router } from 'express';
import { dashboard, createUser, createStore, listStores, listUsers } from '../controllers/admin.controller';
import { authenticate } from '../middlewares/auth.middleware';
export const adminRouter = Router();
adminRouter.get('/dashboard', authenticate(['admin']), dashboard);
adminRouter.post('/users', authenticate(['admin']), createUser);
adminRouter.post('/stores', authenticate(['admin']), createStore);
adminRouter.get('/stores', authenticate(['admin']), listStores);
adminRouter.get('/users', authenticate(['admin']), listUsers);
