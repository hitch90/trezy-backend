import { CategoryRepository } from "../repository/CategoryRepository";
import errorCodes from "../helper/errorCodes";
interface IParams {
  id?: number | string;
  slug?: string;
}

export class CategoryController {
  constructor(private categoryRepository: CategoryRepository) {}

  async get(params: IParams = null) {
    if (params && params.id) {
      return await this.getById(params.id);
    }
    if (params && params.slug) {
      return await this.getBySlug(params.slug);
    }
    return await this.categoryRepository.getAll();
  }

  public async getList() {
    return await this.categoryRepository.getList();
  }

  async getById(id: number | string) {
    return await this.categoryRepository.getById(id);
  }

  async getBySlug(slug: string) {
    return await this.categoryRepository.getBySlug(slug);
  }

  async remove(id: number | string) {
    return await this.categoryRepository.remove(id).then(() => {
      return true;
    });
  }

  async add(
    userId: number | string,
    name: string,
    description: string = "",
    image: string = "",
    parentId: string | number
  ) {
    if (!name) {
      return { type: "error", msg: errorCodes.CATEGORY_NAME_NOT_SET };
    }
    return await this.categoryRepository
      .add({ name, description, image, parentId })
      .then(() => {
        return true;
      })
      .catch((err) => {
        console.log(err);
        return { type: "error", msg: errorCodes.INTERNAL };
      });
  }
}
