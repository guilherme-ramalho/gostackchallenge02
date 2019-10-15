import { Router } from "express";
import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController"

const routes = new Router();

routes.post("/user/create", UserController.create);
routes.post("/session/create", SessionController.create);

export default routes;
