import {
  Board,
  highlightAllowedTiles,
  updateBoardState,
  checkUserMove,
  checkIfGameWon,
  checkIfDraw,
  initGameState,
  winGame,
  setGameAsDraw,
  getOppositePath,
  updateGraphState,
  switchPlayer,
} from "@kamon/core";
import { initCLI } from "./cli";
import { loadGameConfigFromFile } from "./game/load";
import { prompt } from "./prompt/prompt";
import { renderTurnDisplay } from "./render/turn";
import { renderWinMessage } from "./render/victory";
import { renderDrawMessage } from "./render/draw";
import { renderBoard } from "./render/renderBoard";

initCLI();

const gameConfig: Board = loadGameConfigFromFile();

let currentGameState = initGameState();
const highlightedInitialBoard = highlightAllowedTiles(
  gameConfig,
  currentGameState,
);
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

    if (action.value === "q") {
      return {
        gameState: { ...currentGameState, isRunning: false },
        allowedMove: false,
      };
    }

    if (action.value === "log") {
      console.log(currentGameState, updateBoardState);
      return {
        gameState: { ...currentGameState },
        allowedMove: false,
      };
    }

    if (action.value === "s") {
      return {
        currentGameState,
        allowedMove: false,
      };
    }

    if (action.value == undefined) {
      return {
        gameState: {
          ...currentGameState,
          message: `Oops, this tile does not exit in the board 😆 ! Please player ${gameState.currentPlayer.toUpperCase()} choose an existing tile`,
        },
        allowedMove: false,
      };
    }

    const { gameState, updatedBoard } = logic;

    const { gameState, allowedMove } = checkUserMove(
      gameConfig,
      action,
      currentGameState,
    );
    currentGameState = gameState;
    if (!allowedMove) continue;

    currentGameState.turnNumber += 1;

    updatedBoard = updateBoardState(gameConfig, action.value, currentGameState);
    const previousPlayer = currentGameState.currentPlayer;
    const graph = updateGraphState(
      currentGameState.currentPlayer,
      updatedBoard,
    );

    updatedBoard = highlightAllowedTiles(updatedBoard, currentGameState);

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

    const isGameWon = checkIfGameWon(gameState, updatedBoard);
    if (isGameWon) {
      currentGameState = winGame(previousPlayer, currentGameState);
      renderWinMessage(currentGameState.winner);
    }
    renderBoard(updatedBoard);
  }
})();
