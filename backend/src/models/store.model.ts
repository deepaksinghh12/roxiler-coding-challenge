import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
export class Store extends Model {
  public id!:number; public name!:string; public email!:string; public address!:string; public ownerId?:number;
}
Store.init({
  id:{ type: DataTypes.INTEGER.UNSIGNED, autoIncrement:true, primaryKey:true },
  name:{ type: DataTypes.STRING, allowNull:false },
  email:{ type: DataTypes.STRING, allowNull:false },
  address:{ type: DataTypes.STRING(400), allowNull:false },
  ownerId:{ type: DataTypes.INTEGER.UNSIGNED, allowNull:true }
}, { sequelize, tableName: 'stores' });
