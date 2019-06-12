import { Base as sequelize } from "../config/database";
import { DataTypes, Model } from "sequelize";

export interface IUser {
  id?: number;
  firstName?: string;
  lastName?: string;
  email: string;
  role?: string;
  password: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export class User extends Model implements IUser {
  public firstName!: string;
  public lastName?: string | null;
  public email: string;
  public role?: string;
  public password: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    firstName: {
      type: new DataTypes.STRING()
    },
    lastName: {
      type: new DataTypes.STRING()
    },
    email: {
      type: new DataTypes.STRING(),
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: new DataTypes.STRING(),
      allowNull: false
    },
    role: {
      type: new DataTypes.STRING(),
      defaultValue: "user"
    }
  },
  { tableName: "users", sequelize, timestamps: true }
);
