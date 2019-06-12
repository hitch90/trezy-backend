import { Producer, IProducer } from "../models/producer";
import config from "../config/config";

export class ProducerRepository {
  constructor() {}

  remove(producerId: number | string): Promise<any> {
    return Producer.destroy(
      {
        where: {
          id: producerId
        }
      }
    );
  }

  public async getAll(): Promise<IProducer[]> {
    return Producer.findAll();
  }


  public async getById(id: number | string): Promise<IProducer> {
    return Producer.findOne({
      where: { id }
    }).then((producer: IProducer) => {
      return producer;
    });
  }

  public async getBySlug(slug: string): Promise<IProducer> {
    return Producer.findOne({
      where: { slug }
    }).then((producer: IProducer) => {
      return producer;
    });
  }

  find(): IProducer[] {
    return null;
  }

  public async isExist(name: string): Promise<boolean> {
    return Producer.findOne({ where: { name } }).then((producer: any) => {
      if (producer === null) {
        return false;
      }
      return true;
    });
  }

  public async add(payload: IProducer): Promise<any> {
    const item = payload;
    item.image = config.api_url + item.image;
    if (item.name.includes(" ")) {
      item.slug = item.name
        .toLowerCase()
        .split(" ")
        .join("-");
    } else {
      item.slug = item.name.toLowerCase();
    }
    return Producer.create(item);
  }
}
