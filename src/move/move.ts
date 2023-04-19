import { Tile } from "../tile/tile";
import {
  getLastPlayedTile,
  getTileFromCoordinates,
  Board,
  Coordinates,
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
  coordinates: Coordinates,
  gameState: GameState
): boolean => {
  if (gameState.turnNumber > 1) {
    return ALLOWED_FIRST_MOVES[coordinates.y][coordinates.x];
  }

  const coordinatesTile = getTileFromCoordinates(
    { x: coordinates.x, y: coordinates.y },
    gameState
  );

  if (coordinatesTile == undefined) {
    return false;
  }

  return checkMoveAccordingToLastPlayedTile(coordinatesTile, gameState);
};
