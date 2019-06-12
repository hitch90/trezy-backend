import express, { Request, Response } from "express";
import { CategoryController } from "../../controllers/CategoryController";
import { asyncWrapper } from "../../helper/asyncWrapper";

const router: express.Router = express.Router();

export function categoryRouter(categoryController: CategoryController) {
  router.get(
    "/",
    asyncWrapper(async (_: Request, res: Response) => {
      const categories = await categoryController.get();
      res.json(categories);
    })
  );

  router.get(
    "/id/:id",
    asyncWrapper(async (req: Request, res: Response) => {
      const categories = await categoryController.get(req.params);
      res.json(categories);
    })
  );
  router.get(
    "/slug/:slug",
    asyncWrapper(async (req: Request, res: Response) => {
      const categories = await categoryController.get(req.params);
      res.json(categories);
    })
  );
  router.get(
    "/list",
    asyncWrapper(async (req: Request, res: Response) => {
      const categories = await categoryController.getList();
      res.json(categories);
    })
  );
  router.post(
    "/remove",
    asyncWrapper(async (req: Request, res: Response) => {
      const { id } = req.body;
      const status = await categoryController.remove(id);
      res.json(status);
    })
  );

  router.post(
    "/add",
    asyncWrapper(async (req: Request, res: Response) => {
      const { name, description, image, parentId, userId } = req.body;
      const category = await categoryController.add(
        userId,
        name,
        description,
        image,
        parentId
      );
      res.json(category);
    })
  );

  return router;
}
