import { DataTypes, Model } from "sequelize";
import { Base as sequelize } from "../config/database";
import { Product } from "./product";
import { User } from "./user";

export interface IReview {
  id?: number;
  name: string;
  slug?: string;
  image?: string;
  description?: string;
  productId?: number;
  userId?: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export class Review extends Model implements IReview {
  public name!: string;
  public slug?: string | null;
  public image?: string;
  public description?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Review.init(
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
    type: {
      type: new DataTypes.STRING()
    },
    videoId: {
      type: new DataTypes.STRING()
    },
    url: {
      type: new DataTypes.STRING()
    },
    author: {
      type: new DataTypes.STRING()
    },
    rate: {
      type: new DataTypes.FLOAT()
    }
  },
  { tableName: "reviews", sequelize, timestamps: true }
);

Review.belongsTo(Product, {
  foreignKey: "productId",
  as: "product"
});
Review.belongsTo(User, {
  foreignKey: "userId",
  as: "user"
});
