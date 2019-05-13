const {{#toFUpperCase}}{{filename}}{{/toFUpperCase}} = require('../models/{{#toLowerCase}}{{filename}}{{/toLowerCase}}');


exports.getAll = function (req, res)  {

    {{#toFUpperCase}}{{filename}}{{/toFUpperCase}}.find({})
        .exec((err, docs) => {
          if (err){ 
            console.log(err);
            res.status(500).json(err);
    
          }
    
          res.json(docs);
    
      });

}

exports.get = function (req, res) {

    let id  = req.params.id;

     if (!id) {
        return res.status(400).json({
        error: {
            status: 400,
            message: "Bad request."
        }
        });
    }

    {{#toFUpperCase}}{{filename}}{{/toFUpperCase}}.findById(id)
    .exec((err, doc) => {
     if (err){ 
       res.status(500).json(err);
     }

     res.status(200).json(doc);

 });
    
}

exports.find = function (req, res)  {

    const key = req.params.key;
    const value = req.params.value;


    if (!key || !value) {
        return res.status(400).json({
        error: {
            status: 400,
            message: "Bad request."
        }
        });
    }


    let payload = {};
    payload[key] = value;


    {{#toFUpperCase}}{{filename}}{{/toFUpperCase}}.find(payload)
    .exec((err, docs) => {
     if (err){

       res.status(500).json(err);

     }

     res.status(200).json(docs);


});

}

exports.create = function (req, res)  {
    
    const data = req.body;

     if (!data) {
    return res.status(400).json({
      error: {
        status: 400,
        message: "Bad request."
      }
    });
  }

    let doc = new {{#toFUpperCase}}{{filename}}{{/toFUpperCase}}(data);

    doc.save( (err, doc) => {
          if (err) {
            return res.status(500).json(err);
          }

          return res.status(201).json(doc);
        });


}

exports.update = function (req, res) {

    const id = req.params.id;
    const data = req.body;

    if (!id || !data) {
        return res.status(400).json({
        error: {
            status: 400,
            message: "Bad request."
        }
        });
    }

    {{#toFUpperCase}}{{filename}}{{/toFUpperCase}}.findByIdAndUpdate(accountId, { $set: data}, { new: true }, function (err, doc) {

                    if (err) {
                      return res.status(500).json(err);
                    }

              return res.status(200).json(doc);


     });

  }

exports.delete = function (req, res)  {
    
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
    

  }
     
