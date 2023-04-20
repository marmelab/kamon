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
import { Action, ALLOWED_FIRST_MOVES_WITH_EMPTY_SPACES } from "../move/move";

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
  console.log(chalk.white.bold("-------------"));
};

const clearAllowedTilesHighlight = (board: Board): Board => {
  const newBoard = JSON.parse(JSON.stringify(board));
  board.forEach((line, y) => {
    line.forEach((tile, x) => {
      if (newBoard[y][x] == null) {
        return;
      }
      newBoard[y][x].moveAllowed = undefined;
    });
  });
  return newBoard;
};

export const highlightAllowedTiles = (
  board: Board,
  gameState: GameState
): Board => {
  const newBoard = clearAllowedTilesHighlight(board);
  if (gameState.turnNumber === 0) {
    ALLOWED_FIRST_MOVES_WITH_EMPTY_SPACES.forEach((line, y) => {
      line.forEach((tile, x) => {
        if (newBoard[y][x] == null) {
          return;
        }

        newBoard[y][x].moveAllowed =
          ALLOWED_FIRST_MOVES_WITH_EMPTY_SPACES[y][x];
      });
    });
    return newBoard;
  } else {
    return board;
  }
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

  const highlightedBoard = highlightAllowedTiles(board, gameState);

  return highlightedBoard;
};
