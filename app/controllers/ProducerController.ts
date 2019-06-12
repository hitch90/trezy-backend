import { ProducerRepository } from "../repository/ProducerRepository";
import errorCodes from "../helper/errorCodes";
interface IParams {
  id?: number | string;
  slug?: string;
}

export class ProducerController {
  constructor(private producerRepository: ProducerRepository) {}

  async get(params: IParams = null) {
    if (params && params.id) {
      return await this.getById(params.id);
    }
    if (params && params.slug) {
      return await this.getBySlug(params.slug);
    }
    return await this.producerRepository.getAll();
  }

  async getById(id: number | string) {
    return await this.producerRepository.getById(id);
  }

  async getBySlug(slug: string) {
    return await this.producerRepository.getBySlug(slug);
  }

  async remove(id: number | string) {
    return await this.producerRepository.remove(id).then(() => {
      return true;
    });
  }

  async add(
    userId: number | string,
    name: string,
    description: string = "",
    image: string = "",
  ) {
    if (!name) {
      return { type: "error", msg: errorCodes.PRODUCER_NAME_NOT_SET };
    }
    return await this.producerRepository
      .add({ name, description, image })
      .then(() => {
        return true;
      })
      .catch((err) => {
        console.log(err);
        return { type: "error", msg: errorCodes.INTERNAL };
      });
  }
}
