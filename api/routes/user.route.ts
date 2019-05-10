import express from "express";

import * as  UsersController from "../controllers/user";

export let userRouter = () => {
  const router = express.Router();

  router.get("/users/", UsersController.getAll);

  router.get("/users/:id", UsersController.get);

  router.post("/users/", UsersController.create);

  router.put("/users/:id", UsersController.update);

  router.delete("/users/:id", UsersController.remove);

  return router;
};
