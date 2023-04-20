import chalk from "chalk";
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

export const winGame = (winner: Player, gameState: GameState): GameState => {
  let newGameState = JSON.parse(JSON.stringify(gameState));

  console.log("⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐");
  console.log();
  console.log(` Well done ${chalk.bgYellowBright(winner)}, you won !`);
  console.log();
  console.log("⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐");

  return { ...newGameState, isRunning: false, winner: winner };
};
