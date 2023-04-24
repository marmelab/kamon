import chalk from "chalk";
import { getMockFromJson } from "../mocks/getMock";
import { getPlayableTilesForNextMove } from "../move/move";
import { generatePromptChoices } from "./choices";
import { getLastPlayedTile } from "../board/board";

const gameStartMockBoard = getMockFromJson("boards/gameBegin.json");
const gameOneTileMockBoard = getMockFromJson("boards/oneTile.json");
describe("generatePromptChoices", () => {
  it("should display correct choices for first turn", () => {
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

    const choices = generatePromptChoices(gameStartMockBoard);
    expect(choices).toEqual(EXPECTED_CHOICES);
  });

  it("should display correct choices after first turn", () => {
    const EXPECTED_CHOICES = [
      {
        title: "\x1B[34mblue B\x1B[39m",
        value: { symbol: "B", color: "blue" },
      },
      {
        title: "\x1B[36mcyan A\x1B[39m",
        value: { symbol: "A", color: "cyan" },
      },
      {
        title: "\x1B[35mmagenta B\x1B[39m",
        value: { symbol: "B", color: "magenta" },
      },
      {
        title: "\x1B[36mcyan C\x1B[39m",
        value: { symbol: "C", color: "cyan" },
      },
      {
        title: "\x1B[36mcyan E\x1B[39m",
        value: { symbol: "E", color: "cyan" },
      },
      {
        title: "\x1B[33myellow B\x1B[39m",
        value: { symbol: "B", color: "yellow" },
      },
      {
        title: "\x1B[31mred B\x1B[39m",
        value: { symbol: "B", color: "red" },
      },
      {
        title: "\x1B[36mcyan F\x1B[39m",
        value: { symbol: "F", color: "cyan" },
      },
      {
        title: "\x1B[32mgreen B\x1B[39m",
        value: { symbol: "B", color: "green" },
      },
      {
        title: "\x1B[36mcyan D\x1B[39m",
        value: { symbol: "D", color: "cyan" },
      },
      { title: "Quit", value: "q" },
      { title: "Save", value: "s" },
    ];

    const choices = generatePromptChoices(gameOneTileMockBoard);
    expect(choices).toEqual(EXPECTED_CHOICES);
  });
});
