import { Board, renderBoard, updateBoardState } from "./board/board";
import { initCLI } from "./cli";
import { loadGameConfigFromFile } from "./gameLoader";
import { prompt } from "./prompt/prompt";
import { switchPlayer } from "./player/player";
import { checkUserMove } from "./move/move";
import { initGameState } from "./game/state";

initCLI();
const gameConfig: Board = loadGameConfigFromFile();

let gameState = initGameState();

renderBoard(gameConfig);

(async () => {
  while (gameState.isRunning) {
    const action = await prompt(gameState, gameConfig);
    const userCanMove = checkUserMove(gameConfig, action, gameState);
    gameState = userCanMove.gameState;
    if (!userCanMove.allowedMove) continue;

    const updatedBoard = updateBoardState(gameConfig, action, gameState);
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
