export createService = function createService() {
  if (!fs.existsSync("./api")) {
    fs.mkdirSync("./api");
  }
  if (!fs.existsSync("./api/services")) {
    fs.mkdirSync("./api/services");
  }
  var source = fs.readFileSync("./templates/api/service.tpl");
  var template = Handlebars.compile(source.toString());

  var result = template({ filename });

  touch.sync("./api/services/" + filename + ".service.js", {});

  fs.writeFileSync(
    "./api/services/" + filename + ".service.js",
    result,
    "UTF-8"
  );
};
