import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';
import dotenv from 'dotenv';
dotenv.config();
const nameValid = (s:string)=> s.length>=20 && s.length<=60;
const passValid = (p:string)=> /^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,16}$/.test(p);
export const signup = async (req:Request,res:Response)=>{
  const { name,email,address,password } = req.body;
  if(!nameValid(name)) return res.status(400).json({ message:'Name must be 20-60 chars' });
  if(!passValid(password)) return res.status(400).json({ message:'Password must be 8-16 chars, include uppercase and special char' });
  const hashed = await bcrypt.hash(password,10);
  const user = await User.create({ name,email,password:hashed,address,role:'user' });
  res.status(201).json({ id:user.id, email:user.email });
};
export const login = async (req:Request,res:Response)=>{
  const { email,password } = req.body;
  const user = await User.findOne({ where:{ email } }) as any;
  if(!user) return res.status(401).json({ message:'Invalid' });
  const ok = await bcrypt.compare(password, user.password);
  if(!ok) return res.status(401).json({ message:'Invalid' });
  const token = jwt.sign({ id:user.id, role:user.role, name:user.name, email:user.email }, process.env.JWT_SECRET || 'verysecret', { expiresIn:'8h' });
  res.json({ token });
};
