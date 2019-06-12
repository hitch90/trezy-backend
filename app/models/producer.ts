import { DataTypes, Model } from "sequelize";
import { Base as sequelize } from "../config/database";
import {Product} from "./product";
import {User} from "./user";

export interface IProducer {
  id?: number;
  name: string;
  slug?: string;
  image?: string;
  description?: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export class Producer extends Model implements IProducer {
  public name!: string;
  public slug?: string | null;
  public image?: string;
  public description?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Producer.init(
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
    }
  },
  { tableName: "producer", sequelize, timestamps: true }
);

Producer.belongsTo(User, {
    foreignKey: "userId",
    as: 'user'
});
