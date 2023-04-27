import chalk from "chalk";
import { Player } from "@kamon/core/src/player/player";

export const renderWinMessage = (winner: Player) => {
  console.log("⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐");
  console.log();
  console.log(` Well done ${chalk.bgYellowBright(winner)}, you won !`);
  console.log();
  console.log("⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐");
};
