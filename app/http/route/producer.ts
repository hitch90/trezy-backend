import express, { Request, Response } from "express";
import { ProducerController } from "../../controllers/ProducerController";
import { asyncWrapper } from "../../helper/asyncWrapper";

const router: express.Router = express.Router();

export function producerRouter(producerController: ProducerController) {
  router.get(
    "/",
    asyncWrapper(async (_: Request, res: Response) => {
      const producers = await producerController.get();
      res.json(producers);
    })
  );

  router.get(
    "/id/:id",
    asyncWrapper(async (req: Request, res: Response) => {
      const producers = await producerController.get(req.params);
      res.json(producers);
    })
  );
  router.get(
    "/slug/:slug",
    asyncWrapper(async (req: Request, res: Response) => {
      const producers = await producerController.get(req.params);
      res.json(producers);
    })
  );
  router.post(
    "/remove",
    asyncWrapper(async (req: Request, res: Response) => {
      const { id } = req.body;
      const status = await producerController.remove(id);
      res.json(status);
    })
  );

  router.post(
    "/add",
    asyncWrapper(async (req: Request, res: Response) => {
      const { name, description, image, userId } = req.body;
      const producer = await producerController.add(
        userId,
        name,
        description,
        image
      );
      res.json(producer);
    })
  );

  return router;
}
