import { GameState } from "../gameState";

export const ALLOWED_FIRST_MOVES = [
  [null, null, null, false, true, true, false, null, null, null],
  [null, null, true, false, false, false, true, null, null],
  [null, true, false, false, false, false, true, null],
  [false, false, false, false, false, false, false],
  [null, true, false, false, false, false, true, null],
  [null, null, true, false, false, false, true, null, null],
  [null, null, null, false, true, true, false, null, null, null],
];

export interface Coordinates {
  x: number;
  y: number;
}

export const checkIfMoveIsAllowed = (
  coordinates: Coordinates,
  isFirstMove: boolean
): boolean => {
  if (isFirstMove) {
    return ALLOWED_FIRST_MOVES[coordinates.y][coordinates.x];
  }

  return true;
};
