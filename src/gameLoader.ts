import * as fs from "fs";
import * as path from "path";
import { Board } from "./board/board";
import chalk from "chalk";
import { getFilePath } from "./cli";
import { initRandomGame } from "./randomizer/randomizer";

const CANNOT_READ_FILE_ERROR =
  "Can't read file; please check your -f argument point to a valid file. Loading random board.";
const CANNOT_PARSE_JSON =
  "Bad json file, couldn't import game. Loading random board.";

export const loadGameConfigFromFile = (): Board => {
  const filePath = getFilePath();
  if (filePath == undefined) {
    return initRandomGame();
  }
  return parseBoardFromPath(filePath);
};

const parseBoardFromPath = (filePath: string): Board => {
  let fileContent;
  let board;

  try {
    fileContent = fs.readFileSync(filePath, "utf8");
  } catch (error) {
    console.error(chalk.red(CANNOT_READ_FILE_ERROR));
    return initRandomGame();
  }

  try {
    board = JSON.parse(fileContent);
  } catch (error) {
    console.error(chalk.red(CANNOT_PARSE_JSON));
    return initRandomGame();
  }

  return board;
};
