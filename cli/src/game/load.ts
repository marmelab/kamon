import * as fs from "fs";
import { Board, initRandomGame } from "@kamon/core";
import chalk from "chalk";
import { getFilePath } from "../cli";

const CANNOT_READ_FILE_ERROR =
  "Can't read file; please check your -f argument point to a valid file.";
const CANNOT_PARSE_JSON = "Bad json file, couldn't import game.";

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
    return null;
  }

  try {
    board = JSON.parse(fileContent);
  } catch (error) {
    console.error(chalk.red(CANNOT_PARSE_JSON));
    return null;
  }

  return board;
};
