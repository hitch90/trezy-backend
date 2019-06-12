import { Category, ICategory } from "../models/category";
import config from "../config/config";

export class CategoryRepository {
  constructor() {}

  remove(categoryId: number | string): Promise<any> {
    return Category.destroy(
      {
        where: {
          id: categoryId
        }
      }
    );
  }

  public async getAll(): Promise<ICategory[]> {
    return Category.findAll({
      where: {
        parentId: null,
        active: true
      },
      include: [
        {
          model: Category,
          as: "children"
        }
      ]
    });
  }

  public async getList(): Promise<ICategory[]> {
    return Category.findAll({

    });
  }

  public async getById(id: number | string): Promise<ICategory> {
    return Category.findOne({
      where: { id },
      include: [
        {
          model: Category,
          as: "children"
        }
      ]
    }).then((category: ICategory) => {
      return category;
    });
  }

  public async getBySlug(slug: string): Promise<ICategory> {
    return Category.findOne({
      where: { slug },
      include: [
        {
          model: Category,
          as: "children"
        }
      ]
    }).then((category: ICategory) => {
      return category;
    });
  }

  find(): ICategory[] {
    return null;
  }

  public async isExist(name: string): Promise<boolean> {
    return Category.findOne({ where: { name } }).then((category: any) => {
      if (category === null) {
        return false;
      }
      return true;
    });
  }

  public async add(payload: ICategory): Promise<any> {
    const item = payload;
    item.image = config.api_url + item.image;
    item.active = true;
    if (item.name.includes(" ")) {
      item.slug = item.name
        .toLowerCase()
        .split(" ")
        .join("-");
    } else {
      item.slug = item.name.toLowerCase();
    }
    return Category.create(item);
  }
}
