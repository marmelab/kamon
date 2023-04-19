import chalk from "chalk";
import { renderTile, Tile } from "../tile/tile";
import { checkIfMoveIsAllowed } from "../move/move";
import { GameState } from "../gameState";

export type NullableTile = Tile | undefined;
export type Board = NullableTile[][];
export let currentBoard: Board = [[null]];

const BLANK_CHAR = chalk.black(" ");

export const getLastPlayedTile = (board: Board): NullableTile => {
  let lastPlayedTile: NullableTile;

  board.forEach((line) => {
    if (lastPlayedTile != undefined) {
      return;
    }
    line.forEach((tile: Tile) => {
      if (lastPlayedTile != undefined || tile == undefined) {
        return;
      }
      if (tile.lastPlayed) {
        lastPlayedTile = tile;
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
  gameState: GameState
): NullableTile => {
  const line = gameState.board[coordinates.y];

  if (line == undefined) {
    return undefined;
  }

  return line.filter((tile: NullableTile) => tile ?? tile)[coordinates.x];
};

export const renderLine = (
  lines: NullableTile[],
  lineIndex: number,
  gameState: GameState
): string => {
  const line = "";
  let x = 0;
  return lines.reduce((accumulator, tile) => {
    if (tile == undefined) {
      return accumulator + BLANK_CHAR;
    }

    const isMoveAllowed = checkIfMoveIsAllowed(
      {
        x,
        y: lineIndex,
        isFirstMove: gameState.turnNumber > 1,
      },
      gameState
    );

    if (isMoveAllowed) {
      tile.style = "allowed";
    }

    x++;
    return accumulator + renderTile(tile);
  }, line);
};

export const renderGame = (gameState: GameState) => {
  gameState.board.forEach((lines, y) => {
    console.log(renderLine(lines, y, gameState));
  });
};
