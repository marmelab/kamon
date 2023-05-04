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
  mainLogic,
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
          message: `Oops, this tile does not exit in the board 😆 ! Please player ${currentGameState.currentPlayer.toUpperCase()} choose an existing tile`,
        },
        allowedMove: false,
      };
    }

    ({ currentGameState, updatedBoard } = mainLogic(
      updatedBoard,
      currentGameState,
      action.value,
    ));

    // TODO: if move is not allowed, continue and show a message
    // TODO: if a game is won, stop and show a message
    // TODO: if a game is a draw, stop and show a message
    // TODO: display turn with renderTurnDisplay(currentGameState.turnNumber);

    renderBoard(updatedBoard);
  }
})();
