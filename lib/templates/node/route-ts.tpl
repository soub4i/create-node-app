import express from "express";

import * as  {{#toFUpperCase}}{{filename}}s{{/toFUpperCase}}Controller from "../controllers/{{#toLowerCase}}{{filename}}{{/toLowerCase}}";

export let {{#toLowerCase}}{{filename}}{{/toLowerCase}}Router = () => {
  const router = express.Router();

  router.get("/{{#toLowerCase}}{{filename}}s{{/toLowerCase}}/", {{#toFUpperCase}}{{filename}}s{{/toFUpperCase}}Controller.getAll);

  router.get("/{{#toLowerCase}}{{filename}}s{{/toLowerCase}}/:id", {{#toFUpperCase}}{{filename}}s{{/toFUpperCase}}Controller.get);

  router.post("/{{#toLowerCase}}{{filename}}s{{/toLowerCase}}/", {{#toFUpperCase}}{{filename}}s{{/toFUpperCase}}Controller.create);

  router.put("/{{#toLowerCase}}{{filename}}s{{/toLowerCase}}/:id", {{#toFUpperCase}}{{filename}}s{{/toFUpperCase}}Controller.update);

  router.delete("/{{#toLowerCase}}{{filename}}s{{/toLowerCase}}/:id", {{#toFUpperCase}}{{filename}}s{{/toFUpperCase}}Controller.remove);

  return router;
};
