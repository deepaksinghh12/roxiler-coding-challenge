import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';
export interface UserAttributes { id:number; name:string; email:string; password:string; address:string; role:string; }
export interface UserCreationAttributes extends Optional<UserAttributes,'id'>{}
export class User extends Model<UserAttributes,UserCreationAttributes> implements UserAttributes {
  public id!: number; public name!: string; public email!: string; public password!: string; public address!: string; public role!: string;
}
User.init({
  id:{ type: DataTypes.INTEGER.UNSIGNED, autoIncrement:true, primaryKey:true },
  name:{ type: DataTypes.STRING, allowNull:false },
  email:{ type: DataTypes.STRING, allowNull:false, unique:true },
  password:{ type: DataTypes.STRING, allowNull:false },
  address:{ type: DataTypes.STRING(400), allowNull:false },
  role:{ type: DataTypes.ENUM('admin','user','owner'), allowNull:false, defaultValue:'user' }
}, { sequelize, tableName: 'users' });
