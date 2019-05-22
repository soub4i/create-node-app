import { default as {{#toFUpperCase}}{{filename}}s{{/toFUpperCase}} } from "../models/{{#toLowerCase}}{{filename}}{{/toLowerCase}}";
import { Request, Response } from "express";

export let getAll = (req: Request, res: Response) => {
  {{#toFUpperCase}}{{filename}}s{{/toFUpperCase}}.find({}).exec((err, docs) => {
    if (err) {
      return res.status(500).json({ error: err });
    } else {
      return res.json(docs);
    }
  });
};

export let get = (req: Request, res: Response) => {
  const id = req.params.id;

  if (!id) {
      return res.status(400).json({
      error: {
        status: 400,
        message: "Bad request."
      }
    });
  }

  {{#toFUpperCase}}{{filename}}s{{/toFUpperCase}}.findById(id).exec((err, docs) => {
    if (err) {
      return res.status(500).json({ error: err });
    }

    return res.json(docs);
  });
};

export let create = (req: Request, res: Response) => {
  const data = req.body;

  if (!data) {
     return res.status(400).json({
      error: {
        status: 400,
        message: "Bad request."
      }
    });
  }

  const doc = new {{#toFUpperCase}}{{filename}}s{{/toFUpperCase}}(data);

  doc.save((err, doc) => {
    if (err) {
      return res.status(500).json({ error: err });
    }

    return res.status(201).json(doc);
  });
};

export let update = (req: Request, res: Response) => {
  const id = req.params.id;

  const patch = req.body;

  if (!id || !patch) {
   return res.status(400).json({
      error: {
        status: 400,
        message: "Bad request."
      }
    });
  }

  {{#toFUpperCase}}{{filename}}s{{/toFUpperCase}}.findByIdAndUpdate(id, { $set: patch }, { new: true }).exec(
    (err, doc) => {
      if (err) {
        return res.status(500).json({ error: err });
      }

      return res.json(doc);
    }
  );
};

export let remove = (req: Request, res: Response) => {
  const id = req.params.id;

   if (!id) {
    return res.status(400).json({
      error: {
        status: 400,
        message: "Bad request."
      }
    });
  }

  {{#toFUpperCase}}{{filename}}s{{/toFUpperCase}}.findByIdAndRemove(id).exec((err, doc) => {
    if (err) {
      return res.status(500).json({ error: err });
    }

    return res.status(204).json({});
  });
};

