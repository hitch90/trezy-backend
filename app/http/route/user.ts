import express, { Request, Response } from "express";
import { asyncWrapper } from "../../helper/asyncWrapper";
import { UserController } from "../../controllers/UserController";
import {AuthService} from "../../services/auth";

const router: express.Router = express.Router();

export function userRouter(userController: UserController, authService: AuthService) {
  router.get(
    "/",
    asyncWrapper(async (_: Request, res: Response) => {

      res.json({});
    })
  );

  router.get(
    "/id/:id",
    asyncWrapper(async (req: Request, res: Response) => {
      res.json({});
    })
  );

  router.post(
    "/register",
    asyncWrapper(async (req: Request, res: Response) => {
      const { firstName, lastName, email, password } = req.body;
      const user = await userController.register(
        email,
        password,
        firstName,
        lastName
      );
      res.json(user);
    })
  );

  router.post(
    "/authenticate",
    asyncWrapper(async (req: Request, res: Response) => {
      const { email, password } = req.body;
      console.log(req.body);
      const isAuth = await authService.check( email, password);
      if (isAuth.type === 'error') {
          res.status(500).json(isAuth);
      } else {
          res.json(isAuth);
      }
    })
  );
  return router;
}
