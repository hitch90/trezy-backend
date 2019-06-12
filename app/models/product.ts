import { DataTypes, Model } from "sequelize";
import { Base as sequelize } from "../config/database";
import { Category } from "./category";
import { Producer } from "./producer";
import { User } from "./user";

export interface IProduct {
  id?: number;
  name: string;
  slug?: string;
  image?: string;
  description?: string;
  categoryId?: number;
  active?: boolean;
  price?: string | number;
  userId?: number | string;
  producerId?: number | string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export class Product extends Model implements IProduct {
  public name!: string;
  public slug?: string | null;
  public image?: string;
  public description?: string;
  public price?: string | number;
  public userId?: number | string;
  public producerId?: number | string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Product.init(
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
    price: {
      type: new DataTypes.STRING()
    }
  },
  { tableName: "products", sequelize, timestamps: true }
);

Product.belongsTo(Category, {
  foreignKey: "categoryId",
  as: "category"
});
Product.belongsTo(Producer, {
  foreignKey: "producerId",
  as: "producer"
});
Product.belongsTo(User, {
  foreignKey: "userId",
  as: "user"
});
