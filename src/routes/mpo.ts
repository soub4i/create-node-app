import express from "express";

import * as  MposController from "../controllers/mpo";

export let mpoRouter = () => {
  const router = express.Router();

  router.get("/mpos/", MposController.getAll);

  router.get("/mpos/:id", MposController.get);

  router.post("/mpos/", MposController.create);

  router.put("/mpos/:id", MposController.update);

  router.delete("/mpos/:id", MposController.remove);

  return router;
};
