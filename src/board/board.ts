import chalk from "chalk";
import { renderTile, Tile } from "../tile/tile";
import { checkIfMoveIsAllowed } from "../move/move";

type NullableTile = Tile | undefined;
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

    const isMoveAllowed = checkIfMoveIsAllowed({
      x,
      y: lineIndex,
      isFirstMove: isFirstRender,
    });

    if (isMoveAllowed) {
      tile.style = "allowed";
    }

    x++;
    return accumulator + renderTile(tile);
  }, line);
};

export const renderBoard = (data: Board) => {
  if (isFirstRender === false) {
    isFirstRender = true;
  }

  data.forEach((lines, y) => {
    console.log(renderLine(lines, y));
  });
};
