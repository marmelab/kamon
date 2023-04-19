import { Tile } from "../tile/tile";
import {
  getLastPlayedTile,
  getTileFromCoordinates,
  currentBoard,
} from "../board/board";

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

export const checkMoveAccordingToLastPlayedTile = (tile: Tile): boolean => {
  if (tile.lastPlayed === true) {
    return false;
  }

  const lastPlayedTile: Tile = getLastPlayedTile();

  if (lastPlayedTile == undefined) {
    return true;
  }

  return (
    lastPlayedTile.color === tile.color && lastPlayedTile.symbol === tile.symbol
  );
};

export const checkIfMoveIsAllowed = (action: Action): boolean => {
  if (action.isFirstMove === true) {
    return ALLOWED_FIRST_MOVES[action.y][action.x];
  }

  const actionTile = getTileFromCoordinates(
    { x: action.x, y: action.y },
    currentBoard
  );

  if (actionTile == undefined) {
    return false;
  }

  return checkMoveAccordingToLastPlayedTile(actionTile);
};
