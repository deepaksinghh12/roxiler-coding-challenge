import { Request, Response } from 'express';
import { Store } from '../models/store.model';
import { Rating } from '../models/rating.model';
import { Op } from 'sequelize';

export const listStores = async (req:Request,res:Response)=>{
  const { qName, qAddress, page=1, limit=20, sortBy='name', order='asc' } = req.query as any;
  const offset = (Number(page)-1)*Number(limit);
  const where:any = {};
  if(qName) where.name = { [Op.iLike]: `%${qName}%` };
  if(qAddress) where.address = { [Op.iLike]: `%${qAddress}%` };
  const stores = await Store.findAll({ where, offset, limit: Number(limit), order:[[sortBy as string, order as string]] });
  
  const userId = (req as any).user?.id;
  const result = [];
  for(const s of stores){
    const avg = await Rating.findAll({ where: { storeId: (s as any).id } });
    const avgNum = avg.length? Math.round(avg.reduce((a:any,b:any)=>a+b.rating,0)/avg.length):0;
    let userRating = null;
    if(userId) {
      const ur = await Rating.findOne({ where: { storeId: (s as any).id, userId } });
      if(ur) userRating = ur.rating;
    }
    result.push({ store: s, averageRating: avgNum, userRating });
  }
  res.json(result);
};

export const getStore = async (req:Request,res:Response)=>{
  const { id } = req.params;
  const s = await Store.findByPk(Number(id));
  if(!s) return res.status(404).json({ message:'Not found' });
  const ratings = await Rating.findAll({ where: { storeId: s.id } });
  res.json({ store: s, ratings });
};

export const submitRating = async (req:Request,res:Response)=>{
  const { storeId } = req.params;
  const { rating, comment } = req.body;
  const userId = (req as any).user?.id;
  if(!userId) return res.status(401).json({ message:'Unauthorized' });
  if(rating<1 || rating>5) return res.status(400).json({ message:'Rating must be 1-5' });
  const existing = await Rating.findOne({ where: { userId, storeId: Number(storeId) } });
  if(existing){ existing.rating = rating; existing.comment = comment; await existing.save(); return res.json(existing); }
  const r = await Rating.create({ userId, storeId: Number(storeId), rating, comment });
  res.status(201).json(r);
};
