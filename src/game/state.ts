import { BLACK_PLAYER, Player } from "../player/player";

export interface GameState {
  currentPlayer: Player;
  isRunning: boolean;
  winner?: Player;
  turnNumber: number;
  message: string;
}

export const initGameState = (): GameState => ({
  currentPlayer: BLACK_PLAYER,
  isRunning: true,
  winner: null,
  turnNumber: 0,
  message: "Welcome to Kamon 🍱 ! Black player, you turn",
});
