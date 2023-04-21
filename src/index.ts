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
import { checkIfGameWon, initGameState, winGame } from "./game/state";
import { renderTurnDisplay } from "./turn";
import { drawWinMessage } from "./victory";
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
    const previousPlayer = currentGameState.currentPlayer;
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

    const possibleMoves = getPlayableTilesForNextMove(
      updatedBoard,
      getLastPlayedTile(updatedBoard)
    );

    const isGameWon = checkIfGameWon(gameState, possibleMoves);
    if (isGameWon) {
      currentGameState = winGame(previousPlayer, currentGameState);
      drawWinMessage(currentGameState.winner);
    }
  }
})();
