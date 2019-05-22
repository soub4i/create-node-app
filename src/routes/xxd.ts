import express from "express";

import * as  XxdsController from "../controllers/xxd";

export let xxdRouter = () => {
  const router = express.Router();

  router.get("/xxds/", XxdsController.getAll);

  router.get("/xxds/:id", XxdsController.get);

  router.post("/xxds/", XxdsController.create);

  router.put("/xxds/:id", XxdsController.update);

  router.delete("/xxds/:id", XxdsController.remove);

  return router;
};
