import chalk from "chalk";

export const renderTurnDisplay = (turnNumber: number) => {
  console.log(
    `${chalk.yellowBright("TURN NUMBER : ")} ${chalk.yellow(turnNumber + 1)}`
  );
};
