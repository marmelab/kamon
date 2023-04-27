import {
  Board,
  setAllowedTiles,
  updateBoardState,
} from "@kamon/core/src/board/board";
import { initCLI } from "./cli";
import { loadGameConfigFromFile } from "./game/load";
import { prompt } from "./prompt/prompt";
import { checkUserMove } from "@kamon/core/src/move/move";
import {
  checkIfGameWon,
  checkIfDraw,
  initGameState,
  winGame,
  setGameAsDraw,
} from "@kamon/core";
import { renderTurnDisplay } from "./render/turn";
import { renderWinMessage } from "./render/victory";
import { renderDrawMessage } from "./render/draw";
import { getOppositePath, updateGraphState } from "@kamon/core/src/graph/graph";
import { switchPlayer } from "@kamon/core/src/player/player";
import { renderBoard } from "./render/renderBoard";

initCLI();

const gameConfig: Board = loadGameConfigFromFile();

let currentGameState = initGameState();
const highlightedInitialBoard = setAllowedTiles(gameConfig, currentGameState);
renderTurnDisplay(currentGameState.turnNumber);
renderBoard(highlightedInitialBoard);
let updatedBoard = highlightedInitialBoard;

(async () => {
  while (currentGameState.isRunning) {
    if (checkIfDraw(currentGameState)) {
      currentGameState = setGameAsDraw(currentGameState);
    }
    if (currentGameState.isDraw === true) {
      renderDrawMessage();
      return;
    }

    const action = await prompt(currentGameState, updatedBoard);

    const { gameState, allowedMove } = checkUserMove(
      gameConfig,
      action,
      currentGameState,
    );
    currentGameState = gameState;
    if (!allowedMove) continue;

    currentGameState.turnNumber += 1;

    updatedBoard = updateBoardState(gameConfig, action, currentGameState);
    const previousPlayer = currentGameState.currentPlayer;
    const graph = updateGraphState(
      currentGameState.currentPlayer,
      updatedBoard,
    );

    updatedBoard = setAllowedTiles(updatedBoard, currentGameState);

    renderTurnDisplay(currentGameState.turnNumber);

    if (getOppositePath(graph).length > 0) {
      currentGameState = {
        ...currentGameState,
        message: `!!!!!! ${currentGameState.currentPlayer.toUpperCase()} WON 🥳 !!!!!!`,
        winner: currentGameState.currentPlayer,
        isRunning: false,
      };
      console.log(currentGameState.message);
    }

    currentGameState = {
      ...currentGameState,
      currentPlayer: switchPlayer(currentGameState.currentPlayer),
      message: `${switchPlayer(
        currentGameState.currentPlayer,
      ).toUpperCase()}, your turn`,
    };

    const { isGameWon } = checkIfGameWon(gameState, updatedBoard);
    if (isGameWon) {
      currentGameState = winGame(previousPlayer, currentGameState);
      renderWinMessage(currentGameState.winner);
    }
    renderBoard(updatedBoard);
  }
})();
