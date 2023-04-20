import chalk from "chalk";
import { renderTile, Tile } from "../tile/tile";
import { checkIfMoveIsAllowed } from "../move/move";

export type NullableTile = Tile | undefined;
export type Board = NullableTile[][];

const BLANK_CHAR = chalk.black(" ");
let isFirstRender = false;

export const renderLine = (
  lines: NullableTile[],
  lineIndex: number
): string => {
  const line = "";
  let x = 0;
  return lines.reduce((accumulator, tile) => {
    if (tile == undefined) {
      return accumulator + BLANK_CHAR;
    }

    x++;
    return accumulator + renderTile(tile);
  }, line);
};

export const renderBoard = (data: Board) => {
  data.forEach((lines, y) => {
    console.log(renderLine(lines, y));
  });
};
