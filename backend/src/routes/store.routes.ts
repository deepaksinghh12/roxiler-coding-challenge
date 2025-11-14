import { Router } from 'express';
import { listStores, getStore, submitRating } from '../controllers/store.controller';
import { authenticate } from '../middlewares/auth.middleware';
export const storeRouter = Router();
storeRouter.get('/', listStores);
storeRouter.get('/:id', authenticate(), getStore);
storeRouter.post('/:storeId/rating', authenticate(['user']), submitRating);
