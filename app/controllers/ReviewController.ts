import { ReviewRepository } from "../repository/ReviewRepository";
import errorCodes from "../helper/errorCodes";
interface IParams {
  id?: number | string;
  slug?: string;
}

export class ReviewController {
  constructor(private reviewRepository: ReviewRepository) {}

  async get(params: IParams = null) {
    if (params && params.id) {
      return await this.getById(params.id);
    }
    if (params && params.slug) {
      return await this.getBySlug(params.slug);
    }
    return await this.reviewRepository.getAll();
  }

  async getById(id: number | string) {
    return await this.reviewRepository.getById(id);
  }

  async getBySlug(slug: string) {
    return await this.reviewRepository.getBySlug(slug);
  }

  async add(
    name: string,
    description: string,
    productId: number,
    image: string,
    userId: string
  ) {
    if (!name) {
      return { type: "error", msg: errorCodes.REVIEW_NAME_NOT_SET };
    }
    return await this.reviewRepository
      .add({ name, description, productId, image, userId })
      .then(() => {
        return true;
      })
      .catch(() => {
        return { type: "error", msg: errorCodes.INTERNAL };
      });
  }
}
