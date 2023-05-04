import {
  Board,
  highlightAllowedTiles,
  initGameState,
  updateGame,
} from "@kamon/core";
import { initCLI } from "./cli";
import { loadGameConfigFromFile } from "./game/load";
import { prompt } from "./prompt/prompt";
import { renderTurnDisplay } from "./render/turn";
import { renderWinMessage } from "./render/victory";
import { renderDrawMessage } from "./render/draw";
import { renderBoard } from "./render/renderBoard";
import { save } from "./game/save";

initCLI();

let board: Board = loadGameConfigFromFile();

let currentGameState = initGameState();
board = highlightAllowedTiles(board, currentGameState);
renderTurnDisplay(currentGameState.turnNumber);
renderBoard(board);

(async () => {
  while (currentGameState.isRunning) {
    const action = await prompt(currentGameState, board);

    if (action.value === "q") {
      return;
    }

    if (action.value === "log") {
      console.log(currentGameState, board);
      continue;
    }

    if (action.value === "s") {
      save(board);
      continue;
    }

    if (action.value == undefined) {
      console.log(
        `Oops, this tile does not exit in the board 😆 ! Please player ${currentGameState.currentPlayer.toUpperCase()} choose an existing tile`,
      );
      continue;
    }

    ({ gameState: currentGameState, board } = updateGame(
      board,
      currentGameState,
      action.value,
    ));

    if (currentGameState.winner) {
      console.log(currentGameState.message);
      renderWinMessage(currentGameState.winner);
    }

    if (currentGameState.isDraw === true) {
      renderDrawMessage();
    }

    renderTurnDisplay(currentGameState.turnNumber);
    renderBoard(board);
  }
})();
