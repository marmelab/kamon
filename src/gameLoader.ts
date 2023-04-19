import * as fs from "fs";
import * as path from "path";
import { Board } from "./board/board";
import { createRandomConfig } from "./randomizer/randomizer";
import chalk from "chalk";
import { getFilePath } from "./cli";

const CANNOT_READ_FILE_ERROR =
  "Can't read file; please check your -f argument point to a valid file. Loading random board.";
const CANNOT_PARSE_JSON =
  "Bad json file, couldn't import game. Loading random board.";

export const loadGameConfigFromFile = (): Board => {
  const filePath = getFilePath();
  return parseBoardFromPath(filePath);
};

const parseBoardFromPath = (filePath: string): Board => {
  let fileContent;
  let board;

  try {
    fileContent = fs.readFileSync(filePath, "utf8");
  } catch (error) {
    console.error(chalk.red(CANNOT_READ_FILE_ERROR));
    return createRandomConfig();
  }

  try {
    board = JSON.parse(fileContent);
  } catch (error) {
    console.error(chalk.red(CANNOT_PARSE_JSON));
    return createRandomConfig();
  }

  return board;
};
