import { DataTypes, Model } from "sequelize";
import { Base as sequelize } from "../config/database";
import { Product } from "./product";
import { User } from "./user";

export interface ICategory {
  id?: number;
  name: string;
  slug?: string;
  image?: string;
  parentId?: string | number;
  description?: string;
  active?: boolean;
  userId?: number | string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export class Category extends Model implements ICategory {
  public name!: string;
  public slug?: string | null;
  public image?: string;
  public description?: string;
  public active?: boolean;
  public userId?: number | string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Category.init(
  {
    name: {
      type: new DataTypes.STRING()
    },
    description: {
      type: new DataTypes.TEXT()
    },
    slug: {
      type: new DataTypes.STRING()
    },
    image: {
      type: new DataTypes.STRING()
    },
    active: {
      type: new DataTypes.BOOLEAN(),
      defaultValue: true
    }
  },
  { tableName: "categories", sequelize, timestamps: true }
);

Category.hasMany(Category, {
  foreignKey: "parentId",
  as: "children"
});
Category.belongsTo(User, {
  foreignKey: "userId",
  as: "user"
});
