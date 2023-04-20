import chalk from "chalk";
import {
  findLastPLayed,
  findTile,
  findTileByCoordinate,
  PlayableTile,
  playTile,
  removeLastPlayed,
  renderTile,
  Tile,
} from "../tile/tile";
import { GameState } from "../game/state";
import { Action } from "../move/move";

export type NullableTile = Tile | undefined;
export type Board = NullableTile[][];
export let currentBoard: Board = [[null]];
export interface Coordinates {
  x: number;
  y: number;
}

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

export const renderLine = (lines: NullableTile[]): string => {
  const line = "";
  return lines.reduce((accumulator, tile) => {
    if (tile == undefined) {
      return accumulator + BLANK_CHAR;
    }
    return accumulator + renderTile(tile);
  }, line);
};

export const renderBoard = (board: Board) => {
  board.forEach((lines, y) => {
    console.log(renderLine(lines));
  });
  console.log(chalk.white.bold("-------------"));
};

export const updateBoardState = (
  board: Board,
  action: Action,
  gameState: GameState
): Board => {
  const { x: lastPlayedLineIndex, y: lastPlayedTileIndex } =
    findLastPLayed(board);

  if (lastPlayedLineIndex != undefined && lastPlayedTileIndex != undefined) {
    board[lastPlayedLineIndex][lastPlayedTileIndex] = removeLastPlayed(
      board[lastPlayedLineIndex][lastPlayedTileIndex] as PlayableTile
    );
  }

  const { x: lineIndex, y: tileIndex } = findTile(board, action.value as Tile);
  const tile = playTile(
    findTileByCoordinate(board, { x: lineIndex, y: tileIndex }),
    gameState.currentPlayer
  );

  board[lineIndex][tileIndex] = tile;

  return board;
};
