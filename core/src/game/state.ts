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

export const updateRemainingTiles = (gameState: GameState): GameState => {
  const newGameState = JSON.parse(JSON.stringify(gameState));

  if (gameState.currentPlayer === null) {
    return newGameState;
  }

  newGameState.remainingTiles[gameState.currentPlayer] -= 1;

  return newGameState;
};
