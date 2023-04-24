import { Command } from "commander";
import * as path from "path";

let program: Command;

export const initCLI = () => {
  program = new Command();
  program
    .option(
      "-f, --filepath <string>",
      "A path to load a kamon game from a file, otherwise a new random game is initialize"
    )
    .parse(process.argv);
};

export const getFilePath = (): string => {
  const filePathParameter = program.opts()["filepath"];

  return filePathParameter;
};
