import chalk from "chalk";
import { Board, getLastPlayedTile } from "../board/board";
import { GameState } from "../game/state";
import {
  NEUTRALE_TILE,
  Tile,
  TileCoordinate,
  findTile,
  findTileByCoordinate,
} from "../tile/tile";

export const ALLOWED_FIRST_MOVES = [
  [false, false, false, false, true, true, false, false, false, false],
  [false, false, true, false, false, false, true, false, false],
  [false, true, false, false, false, false, true, false],
  [false, false, false, false, false, false, false],
  [false, true, false, false, false, false, true, false],
  [false, false, true, false, false, false, true, false, false],
  [false, false, false, false, true, true, false, false, false, false],
];

export interface Action {
  value: "q" | undefined | Tile;
}

interface CheckedUserMove {
  gameState: GameState;
  allowedMove: boolean;
}

const checkMoveOnFirstTurn = (
  playedTileCoordinates: TileCoordinate
): { allowedMove: boolean; message: string } => {
  const badMoveMessage = `🫠 Tile is not playable. Please choose a highlighted tile`;

  if (ALLOWED_FIRST_MOVES[playedTileCoordinates.x][playedTileCoordinates.y]) {
    return {
      message: "",
      allowedMove: true,
    };
  }

  return {
    message: badMoveMessage,
    allowedMove: false,
  };
};

const checkMoveAfterFirstTurn = (
  playedTile: Tile,
  lastPlayedTile: Tile
): { allowedMove: boolean; message: string } => {
  const badMoveMessage = `🫠 Tile is not playable. Please choose a playable tile (last played : ${chalk[
    lastPlayedTile.color
  ](lastPlayedTile.symbol)})`;
  const isColorConstraintRespected = playedTile.color === lastPlayedTile.color;
  const isSymbolConstraintRespected =
    playedTile.symbol === lastPlayedTile.symbol;

  if (isColorConstraintRespected || isSymbolConstraintRespected) {
    return {
      message: "",
      allowedMove: true,
    };
  }

  return {
    message: badMoveMessage,
    allowedMove: false,
  };
};

export const getPlayableTilesForNextMove = (
  board: Board,
  lastPlayedTile: Tile
): Tile[] => {
  const tiles: Tile[] = [];

  board.forEach((line) => {
    line.forEach((tile) => {
      if (
        tile == null ||
        tile.symbol === NEUTRALE_TILE.symbol ||
        tile.playedBy != null
      ) {
        return;
      }

      const { allowedMove } = checkMoveAfterFirstTurn(tile, lastPlayedTile);

      if (tile.playedBy || !allowedMove) {
        return;
      }

      tiles.push(tile);
    });
  });

  return tiles;
};

export const checkUserMove = (
  board: Board,
  action: Action,
  gameState: GameState
): CheckedUserMove => {
  let newAllowedMoveValue: boolean = true;
  let newMessageValue = "";

  if (action.value === "q") {
    return {
      gameState: { ...gameState, isRunning: false },
      allowedMove: false,
    };
  }

  if (action.value == undefined) {
    return {
      gameState: {
        ...gameState,
        message: `Oops, this tile does not exit in the board 😆 ! Please player ${gameState.currentPlayer.toUpperCase()} choose an existing tile`,
      },
      allowedMove: false,
    };
  }

  const { x, y } = findTile(board, action.value);
  const playedTile = findTileByCoordinate(board, { x, y });

  if (gameState.turnNumber === 0) {
    let { message, allowedMove } = checkMoveOnFirstTurn({ x, y });
    newMessageValue = message;
    newAllowedMoveValue = allowedMove;
  } else {
    const lastPlayedTile = getLastPlayedTile(board);
    let { message, allowedMove } = checkMoveAfterFirstTurn(
      playedTile,
      lastPlayedTile
    );
    newMessageValue = message;
    newAllowedMoveValue = allowedMove;
  }

  if (playedTile.playedBy) {
    return {
      gameState: {
        ...gameState,
        message: `Hey budy, are you trying to play on a played tile ?! 🤔 Please player ${gameState.currentPlayer.toUpperCase()} choose an non played tile`,
      },
      allowedMove: false,
    };
  }

  return {
    gameState: { ...gameState, message: newMessageValue },
    allowedMove: newAllowedMoveValue,
  };
};
