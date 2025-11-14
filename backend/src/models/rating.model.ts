import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
export class Rating extends Model {
  public id!:number; public userId!:number; public storeId!:number; public rating!:number; public comment?:string;
}
Rating.init({
  id:{ type: DataTypes.INTEGER.UNSIGNED, autoIncrement:true, primaryKey:true },
  userId:{ type: DataTypes.INTEGER.UNSIGNED, allowNull:false },
  storeId:{ type: DataTypes.INTEGER.UNSIGNED, allowNull:false },
  rating:{ type: DataTypes.SMALLINT, allowNull:false },
  comment:{ type: DataTypes.TEXT }
}, { sequelize, tableName: 'ratings' });
