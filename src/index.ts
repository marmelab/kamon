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
import { initGameState } from "./game/state";
import { renderTurnDisplay } from "./turn";

initCLI();
const gameConfig: Board = loadGameConfigFromFile();

let gameState = initGameState();
const highlightedInitialBoard = highlightAllowedTiles(gameConfig, gameState);
renderTurnDisplay(gameState.turnNumber);
renderBoard(highlightedInitialBoard);

(async () => {
  while (gameState.isRunning) {
    const action = await prompt(gameState, highlightedInitialBoard);
    const userCanMove = checkUserMove(gameConfig, action, gameState);
    gameState = userCanMove.gameState;
    if (!userCanMove.allowedMove) continue;

    gameState.turnNumber += 1;

    const updatedBoard = updateBoardState(gameConfig, action, gameState);
    renderTurnDisplay(gameState.turnNumber);
    renderBoard(updatedBoard);
    gameState = {
      ...gameState,
      currentPlayer: switchPlayer(gameState.currentPlayer),
      message: `${switchPlayer(
        gameState.currentPlayer
      ).toUpperCase()}, your turn`,
    };
  }
})();
