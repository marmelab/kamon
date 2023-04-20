import { Board, getLastPlayedTile } from "../board/board";
import { GameState } from "../game/state";
import {
  NEUTRALE_TILE,
  Tile,
  findLastPLayed,
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

export interface Coordinates {
  x: number;
  y: number;
}

export interface Action {
  value: "q" | undefined | Tile;
}

interface CheckedUserMove {
  gameState: GameState;
  allowedMove: boolean;
}

export const getPlayableTilesForNextMove = (
  board: Board,
  lastPlayedTile: Tile
): Tile[] => {
  let tiles: Tile[] = [];

  board.forEach((line) => {
    line.forEach((tile) => {
      if (
        tile == null ||
        tile.symbol === NEUTRALE_TILE.symbol ||
        tile.playedBy != null
      ) {
        return;
      }

      const isSymbolConstraintUnrespected =
        lastPlayedTile.symbol != tile.symbol;
      const isColorConstraintUnrespected = lastPlayedTile.color != tile.color;

      if (
        tile.lastPlayed ||
        (isSymbolConstraintUnrespected && isColorConstraintUnrespected)
      ) {
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
    return {
      gameState: {
        ...gameState,
        message: !ALLOWED_FIRST_MOVES[x][y]
          ? `🫠 Tile is not playable. Please player ${gameState.currentPlayer.toUpperCase()} choose a playable tile`
          : undefined,
      },
      allowedMove: ALLOWED_FIRST_MOVES[x][y],
    };
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

  const lastPlayedTile = getLastPlayedTile(board);

  const isNeutraleTile = playedTile.symbol === NEUTRALE_TILE.symbol;
  const isColorConstraintUnrespected =
    playedTile.color !== lastPlayedTile.color;
  const isSymbolConstraintUnrespected =
    playedTile.symbol !== lastPlayedTile.symbol;

  if (
    isNeutraleTile ||
    (lastPlayedTile != null &&
      isColorConstraintUnrespected &&
      isSymbolConstraintUnrespected)
  ) {
    let badMoveMessage = `🫠 Tile is not playable. Please player ${gameState.currentPlayer.toUpperCase()} choose a playable tile`;

    if (isColorConstraintUnrespected) {
      badMoveMessage = `🫠 Tile has a different COLOR. Please player ${gameState.currentPlayer.toUpperCase()} choose a playable tile`;
    }

    if (isSymbolConstraintUnrespected) {
      badMoveMessage = `🫠 Tile has a different SYMBOL. Please player ${gameState.currentPlayer.toUpperCase()} choose a playable tile`;
    }

    return {
      gameState: {
        ...gameState,
        message: badMoveMessage,
      },
      allowedMove: false,
    };
  }

  return {
    gameState,
    allowedMove: true,
  };
};
