#!/usr/bin/env node

const program = require("commander");
const {
  loader,
  generateFile,
  gitHandler,
  generateCRUD
} = require("./lib/creator");

loader();

program

  .command("generate <type> <file>")
  .alias("g")
  .description("Generate a file")
  .action(async (type, filename) => {
    await generateFile(type, filename);
  });

program

  .command("crud <file>")
  .description("Generate a file")
  .action(async filename => {
    await generateCRUD(filename);
  });

program

  .command("new <project>")
  .alias("n")

  .description("create a new project a file")

  .action(project => {
    gitHandler(project);
  });

program
  .option("--typescript")
  .option("--javascript")
  .description("Minimalist CLI to speedUP your node projects");

if (!process.argv.slice(2).length) {
  program.outputHelp();
  process.exit();
}

setTimeout(_ => program.parse(process.argv), 50);
