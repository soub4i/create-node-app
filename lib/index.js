#!/usr/bin/env node

/**
 * Module dependencies.
 */

var program = require("commander");
var figlet = require("figlet");

figlet("create-node-app", function(err, data) {
  if (err) {
    console.log("Something went wrong...");
    console.dir(err);
    return;
  }
  console.log(data);
});

program
  .version("0.0.1", "-v, --version")
  .option("-g, --generate", "")
  .action(function(model, cmd) {
    switch (model) {
      case "controller":
      case "c":
        console.log("touch controller");
        break;
      case "service":
      case "s":
        console.log("touch service");
        break;
      case "route":
      case "r":
        console.log("touch route");
        break;
      case "all":
        console.log("touch route");
        console.log("touch controller");
        console.log("touch service");

        break;
      default:
        console.error("Invalid parameters please check the documentation");

        break;
    }
  })
  .parse(process.argv);
