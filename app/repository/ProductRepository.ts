import { Product, IProduct } from "../models/product";
import { Category } from "../models/category";
import config from "../config/config";

export class ProductRepository {
  constructor() {}

  remove(productId: number): boolean {
    return false;
  }

  public async getAll(): Promise<IProduct[]> {
    return Product.findAll({
      include: [
        {
          model: Category,
          as: 'category'
        }
      ]
    });
  }

  public async getById(id: number | string): Promise<IProduct> {
    return Product.findOne({ where: { id } }).then((product: IProduct) => {
      return product;
    });
  }

  public async getByCategory(categoryId: number | string): Promise<IProduct> {
    return Product.findAll({ where: { categoryId } }).then((products: IProduct[]) => {
      return products;
    });
  }

  public async getBySlug(slug: string): Promise<IProduct> {
    return Product.findOne({ where: { slug } }).then((product: IProduct) => {
      return product;
    });
  }

  find(): IProduct[] {
    return null;
  }

  public async isExist(name: string): Promise<boolean> {
    return Product.findOne({ where: { name } }).then((product: any) => {
      if (product === null) {
        return false;
      }
      return true;
    });
  }

  public async add(payload: IProduct): Promise<any> {
    const item = payload;
    item.image = config.api_url + item.image;
    item.active = true;
    if (item.name.includes(' ')) {
      item.slug = item.name
          .toLowerCase()
          .split(" ")
          .join("-");
    } else {
      item.slug = item.name.toLowerCase();
    }
    return Product.create({
      ...item
    });
  }
}
