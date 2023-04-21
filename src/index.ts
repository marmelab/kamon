import {
  Board,
  highlightAllowedTiles,
  renderBoard,
  updateBoardState,
} from "./board/board";
import { initCLI } from "./cli";
import { loadGameConfigFromFile } from "./gameLoader";
import { prompt } from "./prompt/prompt";
import { checkUserMove } from "./move/move";
import { initGameState } from "./game/state";
import { renderTurnDisplay } from "./turn";
import { checkOppositePath, updateGraphState } from "./graph/graph";
import { switchPlayer } from "./player/player";

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
    const graph = updateGraphState(
      currentGameState.currentPlayer,
      updatedBoard
    );

    renderTurnDisplay(currentGameState.turnNumber);
    renderBoard(updatedBoard);

    if (checkOppositePath(graph).length > 0) {
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
        currentGameState.currentPlayer
      ).toUpperCase()}, your turn`,
    };
  }
})();
