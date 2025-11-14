import { Request, Response } from 'express';
import { User } from '../models/user.model';
import { Store } from '../models/store.model';
import { Rating } from '../models/rating.model';
import bcrypt from 'bcrypt';
export const dashboard = async (req:Request,res:Response)=>{
  const users = await User.count();
  const stores = await Store.count();
  const ratings = await Rating.count();
  res.json({ users, stores, ratings });
};
export const createUser = async (req:Request,res:Response)=>{
  const { name,email,address,password,role } = req.body;
  const hashed = await bcrypt.hash(password,10);
  const u = await User.create({ name,email,password:hashed,address,role });
  res.status(201).json({ id:u.id, email:u.email, role:u.role });
};
export const createStore = async (req:Request,res:Response)=>{
  const { name,email,address,ownerId } = req.body;
  const s = await Store.create({ name,email,address,ownerId });
  res.status(201).json(s);
};
export const listStores = async (req:Request,res:Response)=>{
  const { name,email,address,page=1,limit=20,sortBy='name',order='asc' } = req.query as any;
  const offset = (Number(page)-1)*Number(limit);
  const where:any = {};
  if(name) where.name = name;
  if(email) where.email = email;
  if(address) where.address = address;
  const stores = await Store.findAll({ where, offset, limit: Number(limit), order: [[sortBy as string, order as string]], include: ['owner'] });
  res.json(stores);
};
export const listUsers = async (req:Request,res:Response)=>{
  const { name,email,address,role,page=1,limit=20,sortBy='name',order='asc' } = req.query as any;
  const offset = (Number(page)-1)*Number(limit);
  const where:any = {};
  if(name) where.name = name;
  if(email) where.email = email;
  if(address) where.address = address;
  if(role) where.role = role;
  const users = await User.findAll({ where, offset, limit: Number(limit), order: [[sortBy as string, order as string]] });
  res.json(users);
};
