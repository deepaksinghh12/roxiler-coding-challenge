import { sequelize } from '../config/database';
import { User } from '../models/user.model';
import { Store } from '../models/store.model';
import { Rating } from '../models/rating.model';
import bcrypt from 'bcrypt';
async function seed(){
  await sequelize.sync({ force:true });
  const p = await bcrypt.hash('Password@1',10);
  const admin = await User.create({ name:'System Administrator UserAccount', email:'admin@example.com', password:p, address:'Admin Address 12345678901234567890', role:'admin' });
  const owner = await User.create({ name:'Store Owner Example UserAcc', email:'owner@example.com', password:p, address:'Owner Address long enough to pass rules', role:'owner' });
  const user1 = await User.create({ name:'Normal User Example One____', email:'user1@example.com', password:p, address:'User Address 1 long enough 20 chars', role:'user' });
  const user2 = await User.create({ name:'Normal User Example Two____', email:'user2@example.com', password:p, address:'User Address 2 long enough 20 chars', role:'user' });
  const s1 = await Store.create({ name:'Green Grocery Store', email:'green@example.com', address:'Street 12, City', ownerId: owner.id });
  const s2 = await Store.create({ name:'Daily Needs Shop', email:'daily@example.com', address:'Market Road, City', ownerId: owner.id });
  await Rating.create({ userId: user1.id, storeId: s1.id, rating:5, comment:'Great' });
  await Rating.create({ userId: user2.id, storeId: s1.id, rating:4, comment:'Nice' });
  console.log('Seed complete. admin, owner, user1, user2, stores created. Password for seeds: Password@1'); process.exit(0);
}
seed();
