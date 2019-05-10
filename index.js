#!/usr/bin/env node

/**
 * Module dependencies.
 */

var program = require("commander");
const figlet = require("figlet");
const Handlebars = require("handlebars");
const fs = require("fs");
const touch = require("touch");

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

  if (object) {
    return new Handlebars.SafeString(
      value.charAt(0).toUpperCase() + value.slice(1)
    );
  } else {
    return "";
  }
});

let alias = {
  s: "service",
  r: "route",
  m: "model",
  c: "controller"
};

const generateFile = (type, filename, options) => {
  let typeD = type.length === 1 ? alias[type] : type;

  let lang = program.ts ? "ts" : "js";

  if (!fs.existsSync("./api")) {
    fs.mkdirSync("./api");
  }
  if (!fs.existsSync(`./api/${typeD}s`)) {
    fs.mkdirSync(`./api/${typeD}s`);
  }
  var source = fs.readFileSync(`./templates/api/${typeD}-${lang}.tpl`);
  var template = Handlebars.compile(source.toString());

  var result = template({ filename });

  try {
    touch.sync(`./api/${typeD}s/${filename}.${typeD}.${lang}`, {});

    fs.writeFileSync(
      `./api/${typeD}s/${filename}.${typeD}.${lang}`,
      result,
      "UTF-8"
    );
  } catch (ex) {
    console.log(ex);
  }
};

//const Creator = require("./lib/creator");

// figlet("create-node-app", function(err, data) {
//   if (err) {
//     console.log("Something went wrong...");
//     console.dir(err);
//     return;
//   }
//   console.log(data);
// });
program
  .option("-t,--ts", "small pizza size")
  .option("-j,--js", "small pizza size")
  .command("generate <type> <file>")
  .alias("g")
  .description("List contacts")
  .action((type, filename, options) => generateFile(type, filename, options));

// Assert that a VALID command is provided
// if (!process.argv.slice(2).length || !/[arudl]/.test(process.argv.slice(2))) {
//   program.outputHelp();
//   process.exit();
// }

program.parse(process.argv);
