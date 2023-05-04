import { Board } from "../board/boardType";
import { GameState, checkIfGameWon, winGame } from "./state";
import { highlightAllowedTiles, updateBoardState } from "../board";
import { getOppositePath, updateGraphState } from "../graph";
import { switchPlayer } from "../player";
import { PlayableTile } from "../tile";
import { checkUserMove } from "../move";

export const mainLogic = (
  gameConfig: Board,
  currentGameState: GameState,
  tile: PlayableTile,
) => {
  const { gameState, allowedMove } = checkUserMove(
    gameConfig,
    tile,
    currentGameState,
  );
  currentGameState = gameState;
  if (!allowedMove)
    //continue;

    currentGameState.turnNumber += 1;

  let updatedBoard = updateBoardState(gameConfig, tile, currentGameState);
  const previousPlayer = currentGameState.currentPlayer;
  const graph = updateGraphState(currentGameState.currentPlayer, updatedBoard);

  updatedBoard = highlightAllowedTiles(updatedBoard, currentGameState);

  //renderTurnDisplay(currentGameState.turnNumber);

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
  }

  return { currentGameState, updatedBoard };
};
