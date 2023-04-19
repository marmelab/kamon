import { Tile } from "../tile/tile";
import {
  getLastPlayedTile,
  getTileFromCoordinates,
  Board,
} from "../board/board";
import { GameState } from "../gameState";

const ALLOWED_FIRST_MOVES = [
  [false, true, true, false],
  [true, false, false, false, true],
  [true, false, false, false, false, true],
  [false, false, false, false, false, false, false],
  [true, false, false, false, false, true],
  [true, false, false, false, true],
  [false, true, true, false],
];

export interface Action {
  x: number;
  y: number;
  isFirstMove: boolean;
}

export const checkMoveAccordingToLastPlayedTile = (
  tile: Tile,
  gameState: GameState
): boolean => {
  if (tile.lastPlayed === true) {
    return false;
  }

  const lastPlayedTile: Tile = getLastPlayedTile(gameState.board);

  if (lastPlayedTile == undefined) {
    return true;
  }

  return (
    lastPlayedTile.color === tile.color && lastPlayedTile.symbol === tile.symbol
  );
};

export const checkIfMoveIsAllowed = (
  action: Action,
  gameState: GameState
): boolean => {
  if (action.isFirstMove === true) {
    return ALLOWED_FIRST_MOVES[action.y][action.x];
  }

  const actionTile = getTileFromCoordinates(
    { x: action.x, y: action.y },
    gameState
  );

  if (actionTile == undefined) {
    return false;
  }

  return checkMoveAccordingToLastPlayedTile(actionTile, gameState);
};
