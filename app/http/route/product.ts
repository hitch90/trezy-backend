import express, { Request, Response } from "express";
import { ProductController } from "../../controllers/ProductController";
import { asyncWrapper } from "../../helper/asyncWrapper";

const router: express.Router = express.Router();

export function productRouter(productController: ProductController) {
  router.get(
    "/",
    asyncWrapper(async (_: Request, res: Response) => {
      const categories = await productController.get();
      res.json(categories);
    })
  );

  router.get(
    "/id/:id",
    asyncWrapper(async (req: Request, res: Response) => {
      const products = await productController.get(req.params);
      res.json(products);
    })
  );
  router.get(
    "/slug/:slug",
    asyncWrapper(async (req: Request, res: Response) => {
      const products = await productController.get(req.params);
      res.json(products);
    })
  );

  router.get(
    "/category/:id",
    asyncWrapper(async (req: Request, res: Response) => {
      const products = await productController.getByCategory(req.params);
      res.json(products);
    })
  );

  router.post(
    "/add",
    asyncWrapper(async (req: Request, res: Response) => {
      const { name, description, categoryId, image, price, producerId } = req.body;
      const product = await productController.add(
        name,
        description,
        categoryId,
        image,
        price,
          producerId
      );
      res.json(product);
    })
  );

  return router;
}
