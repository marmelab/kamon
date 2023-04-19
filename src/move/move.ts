const ALLOWED_FIRST_MOVES = [
  [false, true, true, false],
  [true, false, false, false, true],
  [true, false, false, false, false, true],
  [false, false, false, false, false, false, false],
  [true, false, false, false, false, true],
  [true, false, false, false, true],
  [true, false, false, false],
];

export interface Action {
  x: number;
  y: number;
  isFirstMove: boolean;
}

export const checkIfMoveIsAllowed = (action: Action): boolean => {
  if (action.isFirstMove === true) {
    return ALLOWED_FIRST_MOVES[action.y][action.x];
  }

  return true;
};
