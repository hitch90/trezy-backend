import express from "express";
import * as bodyParser from "body-parser";
import { CategoryController } from "../controllers/CategoryController";
import { categoryRouter } from "./route/category";
import { UserController } from "../controllers/UserController";
import { userRouter } from "./route/user";
import { productRouter } from "./route/product";
import { producerRouter } from "./route/producer";
import { reviewRouter } from "./route/review";
import { ProductController } from "../controllers/ProductController";
import { ProducerController } from "../controllers/ProducerController";
import { ReviewController } from "../controllers/ReviewController";
import { AuthService } from "../services/auth";
import { ProtectedRoutes } from "./middleware/routeGuard";
import { uploadRouter } from "./route/upload";
import cors from "cors";
import { authRouter } from "./route/auth";
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.options("*", cors());
app.use(express.static('static'));
app.use("/api", ProtectedRoutes);
export const appFactory = (
  categoryController: CategoryController,
  producerController: ProducerController,
  userController: UserController,
  productController: ProductController,
  reviewController: ReviewController,
  authService: AuthService
) => {
  app.use("/categories", categoryRouter(categoryController));
  app.use("/producers", producerRouter(producerController));
  app.use("/products", productRouter(productController));
  app.use("/reviews", reviewRouter(reviewController));
  ProtectedRoutes.use("/files", uploadRouter());
  ProtectedRoutes.use("/auth", authRouter());
  app.use("/user", userRouter(userController, authService));
  return app;
};
