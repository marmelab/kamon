import chalk from "chalk";
import { Player } from "./player/player";

export const drawWinMessage = (winner: Player) => {
  console.log("⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐");
  console.log();
  console.log(` Well done ${chalk.bgYellowBright(winner)}, you won !`);
  console.log();
  console.log("⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐");
};
