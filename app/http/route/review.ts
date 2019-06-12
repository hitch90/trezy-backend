import express, { Request, Response } from "express";
import { ReviewController } from "../../controllers/ReviewController";
import { asyncWrapper } from "../../helper/asyncWrapper";

const router: express.Router = express.Router();

export function reviewRouter(reviewController: ReviewController) {
  router.get(
    "/",
    asyncWrapper(async (_: Request, res: Response) => {
      const categories = await reviewController.get();
      res.json(categories);
    })
  );

  router.get(
    "/id/:id",
    asyncWrapper(async (req: Request, res: Response) => {
      const categories = await reviewController.get(req.params);
      res.json(categories);
    })
  );
  router.get(
    "/slug/:slug",
    asyncWrapper(async (req: Request, res: Response) => {
      const categories = await reviewController.get(req.params);
      res.json(categories);
    })
  );

  router.post(
    "/add",
    asyncWrapper(async (req: Request, res: Response) => {
      const { name, description, productId, image, userId } = req.body;
      const review = await reviewController.add(name, description, productId, image, userId);
      res.json(review);
    })
  );

  return router;
}
