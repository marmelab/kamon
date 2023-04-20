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
import { switchPlayer } from "./player/player";
import { getPlayableTilesForNextMove, checkUserMove } from "./move/move";
import { initGameState, winGame } from "./game/state";
import { renderTurnDisplay } from "./turn";

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
    const previousPlayer = currentGameState.currentPlayer;
    renderTurnDisplay(currentGameState.turnNumber);
    renderBoard(updatedBoard);
    currentGameState = {
      ...currentGameState,
      currentPlayer: switchPlayer(currentGameState.currentPlayer),
      message: `${switchPlayer(
        currentGameState.currentPlayer
      ).toUpperCase()}, your turn`,
    };

    const possibleMoves = getPlayableTilesForNextMove(
      updatedBoard,
      getLastPlayedTile(updatedBoard)
    );

    if (possibleMoves.length === 0) {
      currentGameState = winGame(previousPlayer, currentGameState);
    }
  }
})();
