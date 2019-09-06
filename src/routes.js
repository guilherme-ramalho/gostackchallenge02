import { Router } from "express";
import User from "./app/models/User";

const routes = new Router();

routes.get("/user/create", async (request, response) => {
  try {
    const user = await User.create({
      name: "Guilherme Ramalho",
      email: "guilherme-ramalho@outlook.com",
      password: "teste"
    });

    return response.json(user);
  } catch (error) {
    return response.json(error);
  }
});

export default routes;
