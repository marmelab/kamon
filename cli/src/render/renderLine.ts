import chalk from "chalk";
import { NullableTile } from "@kamon/core/src/board/board";
import { renderTile } from "./renderTile";

const BLANK_CHAR = chalk.black(" ");

export const renderLine = (lines: NullableTile[]): string => {
  const line = "";
  return lines.reduce((accumulator, tile) => {
    if (tile == undefined) {
      return accumulator + BLANK_CHAR;
    }
    return accumulator + renderTile(tile);
  }, line);
};
