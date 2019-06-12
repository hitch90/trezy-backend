import { CategoryController } from "./controllers/CategoryController";
import { CategoryRepository } from "./repository/CategoryRepository";
import { appFactory } from "./http/app";
import { UserController } from "./controllers/UserController";
import { UserRepository } from "./repository/UserRepository";
import { ProductController } from "./controllers/ProductController";
import { ProductRepository } from "./repository/ProductRepository";
import { ReviewRepository } from "./repository/ReviewRepository";
import { ReviewController } from "./controllers/ReviewController";
import { ProducerController } from "./controllers/ProducerController";
import { ProducerRepository } from './repository/ProducerRepository';
import { AuthService } from "./services/auth";

// repositories
const categoryRepository = new CategoryRepository();
const userRepository = new UserRepository();
const productRepository = new ProductRepository();
const reviewRepository = new ReviewRepository();
const producerRepository = new ProducerRepository();
// controllers
const categoryController = new CategoryController(categoryRepository);
const userController = new UserController(userRepository);
const productController = new ProductController(productRepository);
const reviewController = new ReviewController(reviewRepository);
const producerController = new ProducerController(producerRepository);

const authService = new AuthService(userRepository);
// app
const app = appFactory(
  categoryController,
  producerController,
  userController,
  productController,
  reviewController,
  authService
);

const server = app.listen(3000, () => {
  console.info(`Listening on *:3000`);
});
server.setTimeout(5000);
