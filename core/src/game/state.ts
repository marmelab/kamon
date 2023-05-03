import { getLastPlayedTile } from "../board/boardService";
import { Board } from "../board/boardType";
import { getPlayableTilesForNextMove } from "../move/move";
import { BLACK_PLAYER, Player } from "../player/player";

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

export const checkIfGameWon = (gameState: GameState, board: Board): boolean => {
  if (checkNoMoveLeftVictory(board)) {
    return true;
  }

  return false;
};

export const winGame = (winner: Player, gameState: GameState): GameState => {
  return { ...gameState, isRunning: false, winner: winner };
};

export const checkIfDraw = (gameState: GameState): boolean => {
  return gameState.winner == null && gameState.turnNumber > 35;
};

export const updateRemainingTiles = (gameState: GameState): GameState => {
  const newGameState = JSON.parse(JSON.stringify(gameState));

  newGameState.remainingTiles[gameState.currentPlayer] -= 1;

  return newGameState;
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
