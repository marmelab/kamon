import Graph from "graph-data-structure";
import { Board, getLastPlayedTile } from "../board/board";
import { findLoop, getOppositePath } from "../graph/graph";
import { getPlayableTilesForNextMove } from "../move/move";
import { BLACK_PLAYER, Player } from "../player/player";
import { Tile } from "../tile/tile";

export interface GameState {
  currentPlayer: Player;
  isRunning: boolean;
  isDraw: boolean;
  winner?: Player;
  remainingTiles: {
    black: number;
    white: number;
  };
  turnNumber: number;
  message: string;
}

export const initGameState = (): GameState => ({
  currentPlayer: BLACK_PLAYER,
  isRunning: true,
  winner: null,
  isDraw: false,
  remainingTiles: {
    black: 18,
    white: 18,
  },
  turnNumber: 0,
  message: "Welcome to Kamon 🍱 ! Black player, you turn",
});

export const checkNoMoveLeftVictory = (board: Board): boolean =>
  getPlayableTilesForNextMove(board, getLastPlayedTile(board)).length === 0;

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

  graphPath = findLoop(graph);
  if (graphPath.length > 0) {
    return { isGameWon: true };
  }

  return { isGameWon: false };
};

export const winGame = (winner: Player, gameState: GameState): GameState => {
  return { ...gameState, isRunning: false, winner: winner };
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
