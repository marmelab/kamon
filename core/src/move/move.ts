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
  value: "q" | "log" | undefined | Tile | "s";
}

interface CheckedUserMove {
  gameState: GameState;
  allowedMove: boolean;
}

const checkMoveOnFirstTurn = (
  playedTileCoordinates: TileCoordinate,
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
  lastPlayedTile: Tile,
): { allowedMove: boolean; message: string } => {
  const badMoveMessage = `🫠 Tile is not playable. Please choose a playable tile. Selected tile should be of either same symbol or color than last tile played.`;
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
  lastPlayedTile: Tile,
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
      let isCurrentTileAnAllowedMove: boolean;
      if (lastPlayedTile) {
        const { allowedMove } = checkMoveAfterFirstTurn(tile, lastPlayedTile);
        isCurrentTileAnAllowedMove = allowedMove;
      } else {
        const { allowedMove } = checkMoveOnFirstTurn(findTile(board, tile));
        isCurrentTileAnAllowedMove = allowedMove;
      }

      if (tile.playedBy || !isCurrentTileAnAllowedMove) {
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
  gameState: GameState,
): CheckedUserMove => {
  let newAllowedMoveValue: boolean = true;
  let newMessageValue = "";

  if (action.value === "q") {
    return {
      gameState: { ...gameState, isRunning: false },
      allowedMove: false,
    };
  }

  if (action.value === "log") {
    console.log(board);
    return {
      gameState: { ...gameState },
      allowedMove: false,
    };
  }

  if (action.value === "s") {
    return {
      gameState,
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
      lastPlayedTile,
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
