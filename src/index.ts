import {
  Board,
  getLastPlayedTile,
  highlightAllowedTiles,
  renderBoard,
  updateBoardState,
} from "./board/board";
import { initCLI } from "./cli";
import { loadGameConfigFromFile } from "./gameLoader";
import { prompt } from "./prompt/prompt";
import { getPlayableTilesForNextMove, checkUserMove } from "./move/move";
import {
  checkIfGameWon,
  checkIfDraw,
  initGameState,
  winGame,
  setGameAsDraw,
} from "./game/state";
import { renderTurnDisplay } from "./turn";
import { drawWinMessage } from "./victory";
import { renderDrawMessage } from "./draw";
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

    let updatedBoard = updateBoardState(gameConfig, action, currentGameState);
    const previousPlayer = currentGameState.currentPlayer;
    const graph = updateGraphState(
      currentGameState.currentPlayer,
      updatedBoard
    );

    updatedBoard = highlightAllowedTiles(updatedBoard, currentGameState);

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

    const isGameWon = checkIfGameWon(gameState, updatedBoard);
    if (isGameWon) {
      currentGameState = winGame(previousPlayer, currentGameState);
      drawWinMessage(currentGameState.winner);
    }
  }
})();
