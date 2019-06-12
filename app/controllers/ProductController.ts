import { ProductRepository } from "../repository/ProductRepository";
import errorCodes from "../helper/errorCodes";
interface IParams {
  id?: number | string;
  slug?: string;
}

export class ProductController {
  constructor(private productRepository: ProductRepository) {}

  async get(params: IParams = null) {
    if (params && params.id) {
      return await this.getById(params.id);
    }
    if (params && params.slug) {
      return await this.getBySlug(params.slug);
    }
    return await this.productRepository.getAll();
  }

  async getById(id: number | string) {
    return await this.productRepository.getById(id);
  }

  async getByCategory(params: IParams = null) {
    if (params && params.id) {
      return await this.productRepository.getByCategory(params.id);
    } else {
      return { type: "error", msg: errorCodes.INTERNAL };
    }
  }


  async getBySlug(slug: string) {
    return await this.productRepository.getBySlug(slug);
  }

  async add(
    name: string,
    description: string,
    categoryId: number,
    image: string,
    price: string,
    producerId: string | number
  ) {
    if (!name) {
      return { type: "error", msg: errorCodes.PRODUCT_NAME_NOT_SET };
    }
    return await this.productRepository
      .add({ name, description, categoryId, image, price, producerId })
      .then(() => {
        return true;
      })
      .catch(() => {
        return { type: "error", msg: errorCodes.INTERNAL };
      });
  }
}
