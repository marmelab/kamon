import Graph from "graph-data-structure";
import { Board, getLastPlayedTile } from "../board";
import { GameState } from "../game";
import { Tile, findLoopInBoard } from "../tile";
import { Player } from "../player";
import { getPlayableTilesForNextMove } from "../move";
import { getOppositePath } from "../graph";

export const checkIfGameWon = (
  gameState: GameState,
  board: Board,
  graph: ReturnType<typeof Graph> | undefined = undefined,
): { isGameWon: boolean; highlightedPath?: Tile[] } => {
  let graphPath;

  if (checkNoMoveLeftVictory(board)) {
    return { isGameWon: true };
  }

  graphPath = getOppositePath(graph);
  if (graphPath.length > 0) {
    return { isGameWon: true };
  }

  if (findLoopInBoard(board).length > 0) {
    return { isGameWon: true };
  }

  return { isGameWon: false };
};

export const winGame = (winner: Player, gameState: GameState): GameState => {
  console.log("WIN GAME !");
  return { ...gameState, isRunning: false, winner: winner };
};

export const checkNoMoveLeftVictory = (board: Board): boolean => {
  console.log(getLastPlayedTile(board));
  console.log(
    getPlayableTilesForNextMove(board, getLastPlayedTile(board)).length,
  );
  return (
    getPlayableTilesForNextMove(board, getLastPlayedTile(board)).length === 0
  );
};

export const checkIfDraw = (gameState: GameState): boolean => {
  return gameState.winner == null && gameState.turnNumber > 35;
};

export const setGameAsDraw = (gameState: GameState): GameState => {
  let newGameState = JSON.parse(JSON.stringify(gameState));

  if (newGameState.winner != null) {
    return;
  }

  newGameState.winner = null;
  newGameState.isRunning = false;
  newGameState.isDraw = true;

  return newGameState;
};
