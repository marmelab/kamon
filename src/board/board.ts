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

const BLANK_CHAR = chalk.black(" ");

export const renderLine = (lines: Tile[]): string => {
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
