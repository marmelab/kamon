import chalk from "chalk";
import { Board } from "@kamon/core/src/board/board";
import { renderLine } from "./renderLine";

export const renderBoard = (data: Board) => {
  console.log(chalk.white.bold("-------------"));
  data.forEach((lines) => {
    console.log(renderLine(lines));
  });
  console.log(chalk.white.bold("-------------"));
};
