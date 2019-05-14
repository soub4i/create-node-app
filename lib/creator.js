const program = require("commander");
const Handlebars = require("handlebars");
const fs = require("fs");
const git = require("nodegit");
const ora = require("ora");
const figlet = require("figlet");

const inquirer = require("inquirer");

exports.loader = () => {
  figlet("create-node-app", (err, data) => console.log(data));
};

exports.gitHandler = (filename = "node-project") => {
  let lang = !program.typescript
    ? "typescript"
    : program.typescript
    ? "typescript"
    : "javascript";

  const spinner = ora("Creating project..\r\n").start();

  git
    .Clone(
      `https://github.com/AbderrahimSoubaiElidrissi/express-${lang}-starter`,
      filename
    )
    .then(function(repository) {
      if (repository) {
        console.log("Project created with success ...Happy hacking\r\n");
      }
      spinner.stop();
      // Work with the repository object here.
    })
    .catch(_ => spinner.stop());
};

const questions = [
  {
    type: "input",
    name: `name`,
    message: `${"Field name (lowercase) : "}\r\n`,
    default: ""
  },
  {
    type: "input",
    name: `type`,
    message: `${"Field type (lowercase | mongo primitive types only) : "}\r\n`,
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
  let rootDir = lang === "ts" ? "src" : "app";

  if (!fs.existsSync(`./${rootDir}`)) {
    fs.mkdirSync(`./${rootDir}`);
  }
  if (!fs.existsSync(`./${rootDir}/${type}s`)) {
    fs.mkdirSync(`./${rootDir}/${type}s`);
  }
  var source = fs.readFileSync(`./templates/node/${type}-${lang}.tpl`);
  var template = Handlebars.compile(source.toString());

  var result =
    type === "model"
      ? template({ filename, fields: additionalData.fields })
      : template({ filename });

  try {
    fs.writeFileSync(
      `./${rootDir}/${type}s/${filename}.${lang}`,
      result,
      "UTF-8"
    );
  } catch (ex) {
    console.error(ex);
  }
};

let alias = {
  s: "service",
  r: "route",
  m: "model",
  c: "controller"
};

exports.generateFile = async (type, filename) => {
  if (!type || !filename) {
    program.outputHelp();
    process.exit();
  }

  type = type.length === 1 ? alias[type] : type;
  filename = filename.toLowerCase();
  let lang = !program.typescript ? "ts" : program.typescript ? "ts" : "js";
  var fields = [];

  if (type == "model") {
    const askQuestion = () => {
      inquirer.prompt(questions).then(answer => {
        fields.push(answer);

        if (answer.name != "") {
          askQuestion();
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
