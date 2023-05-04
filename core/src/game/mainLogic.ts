import { Board } from "../board/boardType";
import { GameState, checkIfGameWon, winGame } from "./state";
import { highlightAllowedTiles, updateBoardState } from "../board";
import { getOppositePath, updateGraphState } from "../graph";
import { switchPlayer } from "../player";
import { PlayableTile } from "../tile";
import { checkUserMove } from "../move";
import { checkIfDraw } from "./state";
import { setGameAsDraw } from "./state";

export const mainLogic = (
  board: Board,
  gameState: GameState,
  tile: PlayableTile,
) => {
  const { gameState: updatedGameState, allowedMove } = checkUserMove(
    board,
    tile,
    gameState,
  );

  gameState = updatedGameState;

  if (!allowedMove) {
    return {
      gameState,
      board,
    };
  }

  gameState.turnNumber += 1;

  board = updateBoardState(board, tile, gameState);
  const previousPlayer = gameState.currentPlayer;
  const graph = updateGraphState(gameState.currentPlayer, board);

  board = highlightAllowedTiles(board, gameState);

  if (getOppositePath(graph).length > 0) {
    return {
      gameState: {
        ...gameState,
        message: `!!!!!! ${gameState.currentPlayer.toUpperCase()} WON 🥳 !!!!!!`,
        winner: gameState.currentPlayer,
        isRunning: false,
      },
      board,
    };
  }

  const isGameWon = checkIfGameWon(board);
  if (isGameWon) {
    return {
      gameState: winGame(previousPlayer, gameState),
      board,
    };
  }

  if (checkIfDraw(gameState)) {
    return {
      gameState: setGameAsDraw(gameState),
      board,
    };
  }

  return {
    gameState: {
      ...gameState,
      currentPlayer: switchPlayer(gameState.currentPlayer),
      message: `${switchPlayer(
        gameState.currentPlayer,
      ).toUpperCase()}, your turn`,
    },
    board,
  };
};
