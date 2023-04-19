import chalk from "chalk";
import { renderTile, Tile } from "../tile/tile";

export type Board = Tile[][];

const BLANK_CHAR = chalk.black(" ");

const renderLine = (lines: Tile[]): string => {
  const line = "";
  return lines.reduce((accumulator, tile) => {
    if (tile == undefined) {
      return accumulator + BLANK_CHAR;
    }

    return accumulator + renderTile(tile);
  }, line);
};

export const renderBoard = (data: Board) => {
  console.log(chalk.white.bold("-------------"));
  data.forEach((lines) => {
    console.log(renderLine(lines));
  });
  console.log(chalk.white.bold("-------------"));
};
