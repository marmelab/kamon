import chalk from "chalk";
import { renderTile, Tile } from "../tile/tile";
import { checkIfMoveIsAllowed } from "../move/move";

export type NullableTile = Tile | undefined;
export type Board = NullableTile[][];
export let currentBoard: Board = [[null]];

const BLANK_CHAR = chalk.black(" ");
let isFirstRender = false;

export const getLastPlayedTile = (): NullableTile => {
  let lastPlayedTile: NullableTile;

  currentBoard.forEach((line) => {
    if (lastPlayedTile != undefined) {
      return;
    }
    line.forEach((tile: Tile) => {
      if (tile.lastPlayed) {
        lastPlayedTile = tile;
        return;
      }
    });
  });

  return lastPlayedTile;
};
interface Coordinates {
  x: number;
  y: number;
}
export const getTileFromCoordinates = (
  coordinates: Coordinates,
  board: Board
): NullableTile => {
  const line = board[coordinates.y];

  if (line == undefined) {
    return undefined;
  }

  return line.filter((tile: NullableTile) => tile ?? tile)[coordinates.x];
};

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
  currentBoard = data;
  if (isFirstRender === false) {
    isFirstRender = true;
  }

  data.forEach((lines, y) => {
    console.log(renderLine(lines, y));
  });
};
