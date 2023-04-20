import { Board } from "../board/board";
import { GameState } from "../game/state";
import { NEUTRALE_TILE, findTile, findTileByCoordinate } from "../tile/tile";

interface Action {
  value: any;
}

interface UserMove {
  gameState: GameState;
  allowedMove: boolean;
}

export const checkUserMove = (
  board: Board,
  action: Action,
  gameState: GameState
): UserMove => {
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

  if (playedTile.playedBy) {
    return {
      gameState: {
        ...gameState,
        message: `Hey budy, are you trying to play on a played tile ?! 🤔 Please player ${gameState.currentPlayer.toUpperCase()} choose an non played tile`,
      },
      allowedMove: false,
    };
  }

  if (playedTile.symbol === NEUTRALE_TILE.symbol) {
    return {
      gameState: {
        ...gameState,
        message: `🫠 Tile is not playable. Please player ${gameState.currentPlayer.toUpperCase()} choose a playable tile`,
      },
      allowedMove: false,
    };
  }

  return {
    gameState,
    allowedMove: true,
  };
};
