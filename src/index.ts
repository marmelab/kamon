import {
  Board,
  highlightAllowedTiles,
  renderBoard,
  updateBoardState,
} from "./board/board";
import { initCLI } from "./cli";
import { loadGameConfigFromFile } from "./gameLoader";
import { prompt } from "./prompt/prompt";
import { switchPlayer } from "./player/player";
import { checkUserMove } from "./move/move";
import { checkIfDraw, initGameState, setGameAsDraw } from "./game/state";
import { renderTurnDisplay } from "./turn";
import { renderDrawMessage } from "./draw";

initCLI();
const gameConfig: Board = loadGameConfigFromFile();

let currentGameState = initGameState();
const highlightedInitialBoard = highlightAllowedTiles(
  gameConfig,
  currentGameState
);
renderTurnDisplay(currentGameState.turnNumber);
renderBoard(highlightedInitialBoard);

(async () => {
  while (currentGameState.isRunning) {
    if (checkIfDraw(currentGameState)) {
      currentGameState = setGameAsDraw(currentGameState);
    }
    if (currentGameState.isDraw === true) {
      renderDrawMessage();
      return;
    }

    const action = await prompt(currentGameState, highlightedInitialBoard);

    const { gameState, allowedMove } = checkUserMove(
      gameConfig,
      action,
      currentGameState
    );
    currentGameState = gameState;
    if (!allowedMove) continue;

    currentGameState.turnNumber += 1;

    const updatedBoard = updateBoardState(gameConfig, action, currentGameState);
    renderTurnDisplay(currentGameState.turnNumber);
    renderBoard(updatedBoard);
    currentGameState = {
      ...currentGameState,
      currentPlayer: switchPlayer(currentGameState.currentPlayer),
      message: `${switchPlayer(
        currentGameState.currentPlayer
      ).toUpperCase()}, your turn`,
    };
  }
})();
