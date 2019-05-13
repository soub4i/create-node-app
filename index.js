#!/usr/bin/env node

const program = require("commander");
const inquirer = require("inquirer");
const figlet = require("figlet");
const { generateFile, repoCloner } = require("./lib/creator");

figlet("create-node-app", function(err, data) {
  if (err) {
    console.dir(err);
    return;
  }
  console.log(data);
});

program
  .option("-t,--ts")
  .option("-j,--js")
  .command("generate <type> <file>")
  .alias("g")
  .description("Generate a file")
  .action((type, filename) => generateFile(type, filename))
  .command("new <project>")
  .action(project => repoCloner(project));

if (!process.argv.slice(2).length) {
  program.outputHelp();
  process.exit();
}

program.parse(process.argv);
