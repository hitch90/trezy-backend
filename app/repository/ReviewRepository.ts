import { Review, IReview } from "../models/review";
import { Product } from "../models/product";
import { User } from "../models/user";

export class ReviewRepository {
  constructor() {}

  remove(reviewId: number): boolean {
    return false;
  }

  public async getAll(): Promise<IReview[]> {
    return Review.findAll({
      include: [
        {
          model: Product,
          as: "product",

        },
        {
          model: User,
          as: "user",
          attributes: { exclude: ["password", "role", "id"] }
        }
      ]
    });
  }

  public async getById(id: number | string): Promise<IReview> {
    return Review.findOne({ where: { id } }).then((review: IReview) => {
      return review;
    });
  }

  public async getBySlug(slug: string): Promise<IReview> {
    return Review.findOne({ where: { slug } }).then((review: IReview) => {
      return review;
    });
  }

  find(): IReview[] {
    return null;
  }

  public async isExist(name: string): Promise<boolean> {
    return Review.findOne({ where: { name } }).then((review: any) => {
      if (review === null) {
        return false;
      }
      return true;
    });
  }

  public async add(payload: IReview): Promise<any> {
    return Review.create({
      ...payload,
      slug: payload.name
        .toLowerCase()
        .split(" ")
        .join("-")
    });
  }
}
