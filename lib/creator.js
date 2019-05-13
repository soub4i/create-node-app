const program = require("commander");
const Handlebars = require("handlebars");
const fs = require("fs");
const Git = require("nodegit");

const inquirer = require("inquirer");

exports.repoCloner = (filename = "node-project") => {
  Git.Clone(
    "https://github.com/AbderrahimSoubaiElidrissi/express-typescript-starter",
    filename
  ).then(function(repository) {
    if (repository) {
      console.log("Project created with success");
    }

    // Work with the repository object here.
  });
};

const questions = [
  {
    type: "input",
    name: `name`,
    message: `${"Field name (lowercase) : "}\n\n`,
    default: ""
  },
  {
    type: "input",
    name: `type`,
    message: `${"Field type (lowercase | mongo primitive types only) : "}\n\n`,
    default: `String`
  }
];

Handlebars.registerHelper("toLowerCase", function(options) {
  return options.fn(this).toLowerCase();
});

Handlebars.registerHelper("toFUpperCase", function(options) {
  return (
    options
      .fn(this)
      .charAt(0)
      .toUpperCase() + options.fn(this).slice(1)
  );
});

const createFile = (filename, type, lang, additionalData = {}) => {
  if (!fs.existsSync("./app")) {
    fs.mkdirSync("./app");
  }
  if (!fs.existsSync(`./app/${type}s`)) {
    fs.mkdirSync(`./app/${type}s`);
  }
  var source = fs.readFileSync(`./templates/node/${type}-${lang}.tpl`);
  var template = Handlebars.compile(source.toString());

  var result =
    type === "model"
      ? template({ filename, fields: additionalData.fields })
      : template({ filename });

  try {
    fs.writeFileSync(`./app/${type}s/${filename}.${lang}`, result, "UTF-8");
  } catch (ex) {
    console.log(ex);
  }
};

let alias = {
  s: "service",
  r: "route",
  m: "model",
  c: "controller"
};

exports.generateFile = (type, filename) => {
  if (!type || !filename) {
    program.outputHelp();
    process.exit();
  }

  type = type.length === 1 ? alias[type] : type;
  filename = filename.toLowerCase();
  let lang = !program.ts ? "ts" : program.ts ? "ts" : "js";
  var fields = [];

  if (type == "model") {
    const askQuestion = () => {
      inquirer.prompt(questions).then(answer => {
        console.log(answer);
        fields.push(answer);

        if (answer.name != "") {
          askQuestion(); // Recursion !
        } else {
          createFile(filename, type, lang, { fields });
        }
      });
    };

    askQuestion();
  } else {
    createFile(filename, type, lang);
  }
};
