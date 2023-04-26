import chalk from "chalk";
import { generatePromptChoices } from "./choices";
import { readFileSync } from "fs";

describe("generatePromptChoices", () => {
  it("should display correct choices for first turn", () => {
    const gameStartMockBoard = readFileSync(
      `${__dirname}/../../games/gameBegin.json`,
      "utf-8",
    );

    const EXPECTED_CHOICES = [
      {
        title: chalk.cyan("cyan A"),
        value: { symbol: "A", color: "cyan" },
      },
      {
        title: chalk.red("red D"),
        value: { symbol: "D", color: "red" },
      },
      {
        title: chalk.cyan("cyan E"),
        value: { symbol: "E", color: "cyan" },
      },
      {
        title: chalk.green("green D"),
        value: { symbol: "D", color: "green" },
      },
      {
        title: chalk.cyan("cyan C"),
        value: { symbol: "C", color: "cyan" },
      },
      {
        title: chalk.cyan("cyan B"),
        value: { symbol: "B", color: "cyan" },
      },
      {
        title: chalk.magenta("magenta D"),
        value: { symbol: "D", color: "magenta" },
      },
      {
        title: chalk.yellow("yellow D"),
        value: { symbol: "D", color: "yellow" },
      },
      { title: "Quit", value: "q" },
      { title: "Save", value: "s" },
    ];

    const choices = generatePromptChoices(JSON.parse(gameStartMockBoard));
    expect(choices).toEqual(EXPECTED_CHOICES);
  });

  it("should display correct choices after first turn", () => {
    const gameOneTileMockBoard = readFileSync(
      `${__dirname}/../../games/oneTile.json`,
      "utf-8",
    );

    const EXPECTED_CHOICES = [
      {
        title: chalk.blue("blue B"),
        value: { symbol: "B", color: "blue" },
      },
      {
        title: chalk.cyan("cyan A"),
        value: { symbol: "A", color: "cyan" },
      },
      {
        title: chalk.magenta("magenta B"),
        value: { symbol: "B", color: "magenta" },
      },
      {
        title: chalk.cyan("cyan C"),
        value: { symbol: "C", color: "cyan" },
      },
      {
        title: chalk.cyan("cyan E"),
        value: { symbol: "E", color: "cyan" },
      },
      {
        title: chalk.yellow("yellow B"),
        value: { symbol: "B", color: "yellow" },
      },
      {
        title: chalk.red("red B"),
        value: { symbol: "B", color: "red" },
      },
      {
        title: chalk.cyan("cyan F"),
        value: { symbol: "F", color: "cyan" },
      },
      {
        title: chalk.green("green B"),
        value: { symbol: "B", color: "green" },
      },
      {
        title: chalk.cyan("cyan D"),
        value: { symbol: "D", color: "cyan" },
      },
      { title: "Quit", value: "q" },
      { title: "Save", value: "s" },
    ];

    const choices = generatePromptChoices(JSON.parse(gameOneTileMockBoard));
    expect(choices).toEqual(EXPECTED_CHOICES);
  });
});
