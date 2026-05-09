import { Request, Response } from 'express';
import { Store } from '../models/store.model';
import { Rating } from '../models/rating.model';
import { User } from '../models/user.model';

export const dashboard = async (req: Request, res: Response) => {
  const ownerId = (req as any).user.id;
  
  // Find the store owned by this user
  const store = await Store.findOne({ where: { ownerId } });
  if (!store) {
    return res.status(404).json({ message: 'No store associated with this owner.' });
  }

  // Find all ratings for this store, including the user details
  const ratings = await Rating.findAll({
    where: { storeId: (store as any).id },
    include: [{ model: User, attributes: ['id', 'name', 'email'] }]
  });

  const averageRating = ratings.length ? Math.round(ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length) : 0;

  res.json({
    store,
    averageRating,
    ratings
  });
};
