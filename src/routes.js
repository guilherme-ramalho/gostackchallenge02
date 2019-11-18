import { Router } from "express";
import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import AuthMiddleware from "./app/middlewares/auth" 

const routes = new Router();

routes.post("/session/create", SessionController.create);
routes.post("/user/create", UserController.create);

routes.use(AuthMiddleware);
routes.put("/user/update", UserController.update);

export default routes;
