const program = require("commander");
const Handlebars = require("handlebars");
const fs = require("fs");
const ora = require("ora");
const figlet = require("figlet");
const { spawn } = require("child_process");
const git = require("simple-git");

const inquirer = require("inquirer");

const loader = () => {
  figlet("create-node-app", (err, data) => console.log(data));
};

const gitHandler = async (filename = "node-project") => {
  let lang = !program.typescript
    ? "typescript"
    : program.typescript
    ? "typescript"
    : "javascript";

  const spinner = ora("Creating project..\r\n").start();

  git()
    .silent(true)
    .clone(
      `https://github.com/AbderrahimSoubaiElidrissi/express-${lang}-starter`,
      filename
    )
    .then(
      () => {
        let cmd = spawn("npm", ["install"], { cwd: `./${filename}` });

        cmd.on("close", () => {
          spinner.stop();
        });
      },
      err => {
        spinner.stop();
      }
    );
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

const generateFile = async (type, filename) => {
  if (!type || !filename) {
    program.outputHelp();
    process.exit();
  }

  type = type.length === 1 ? alias[type] : type;
  filename = filename.toLowerCase();
  let lang = !program.typescript ? "ts" : program.typescript ? "ts" : "js";
  var fields = [];

  if (type == "model") {
    const askQuestion = async () => {
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

const generateCRUD = async filename => {
  if (!filename) {
    program.outputHelp();
    process.exit();
  }

  let types = ["model", "controller", "route"];

  types.forEach(element => generateFile(element, filename));
};

module.exports = { generateFile, generateCRUD, gitHandler, loader };
