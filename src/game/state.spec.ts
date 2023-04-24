import { Board } from "../board/board";
import { initGameState, winGame, checkIfGameWon, checkIfDraw } from "./state";
const mockFilledBoard: Board = [
  [
    undefined,
    undefined,
    undefined,
    { symbol: "E", color: "blue", playedBy: "black" },
    { symbol: "A", color: "yellow", playedBy: "black" },
    { symbol: "A", color: "blue", playedBy: "black" },
    { symbol: "C", color: "blue", playedBy: "black" },
    undefined,
    undefined,
    undefined,
  ],
  [
    undefined,
    undefined,
    { symbol: "A", color: "magenta", playedBy: "black" },
    { symbol: "A", color: "cyan", playedBy: "black" },
    { symbol: "A", color: "green", playedBy: "black" },
    { symbol: "D", color: "red", playedBy: "black" },
    { symbol: "A", color: "green", playedBy: "black" },
    undefined,
    undefined,
  ],
  [
    undefined,
    { symbol: "E", color: "cyan", playedBy: "black" },
    { symbol: "B", color: "yellow", playedBy: "black" },
    { symbol: "E", color: "blue", playedBy: "black" },
    { symbol: "D", color: "green", playedBy: "black" },
    { symbol: "F", color: "blue", playedBy: "black" },
    { symbol: "F", color: "yellow", playedBy: "black" },
    undefined,
  ],
  [
    { symbol: "D", color: "cyan", playedBy: "black", lastPlayed: true },
    { symbol: "O", color: "grey", playedBy: null, lastPlayed: false },
    { symbol: "C", color: "green", playedBy: "black" },
    { symbol: "C", color: "cyan", playedBy: "black" },
    { symbol: "E", color: "yellow", playedBy: "black" },
    { symbol: "F", color: "blue", playedBy: "black" },
    { symbol: "B", color: "cyan", playedBy: "black" },
  ],
  [
    undefined,
    { symbol: "B", color: "green", playedBy: "black" },
    { symbol: "D", color: "magenta", playedBy: "black" },
    { symbol: "A", color: "green", playedBy: "black" },
    { symbol: "A", color: "blue", playedBy: "black" },
    { symbol: "D", color: "yellow", playedBy: "black" },
    { symbol: "C", color: "yellow", playedBy: "black" },
    undefined,
  ],
  [
    undefined,
    undefined,
    { symbol: "B", color: "yellow", playedBy: "black" },
    { symbol: "E", color: "green", playedBy: "black" },
    undefined,
    undefined,
  ],
  [
    undefined,
    undefined,
    undefined,
    { symbol: "B", color: "green", playedBy: "black" },
    { symbol: "A", color: "red", playedBy: "black" },
    { symbol: "F", color: "green", playedBy: "black" },
    { symbol: "A", color: "red", playedBy: "black" },
    undefined,
    undefined,
    undefined,
  ],
];

describe("winGame", () => {
  it("should set player as winner", () => {
    expect(winGame("black", initGameState()).winner).toBe("black");
  });

  it("should stop game", () => {
    expect(winGame("black", initGameState()).isRunning).toBeFalsy();
  });
});

describe("checkIfGameIsWon", () => {
  it("should win game when there is no remaining move", () => {
    expect(checkIfGameWon(initGameState(), mockFilledBoard)).toBeTruthy();
  });

  it("shouldn't win game when there is a possible move", () => {
    let boardWithPossibleMove = JSON.parse(JSON.stringify(mockFilledBoard));
    boardWithPossibleMove[0][4] = { symbol: "D", color: "blue" };
    expect(checkIfGameWon(initGameState(), boardWithPossibleMove)).toBeFalsy();
  });
});

describe("checkIfDraw", () => {
  it("should be false if there is a winner", () => {
    let gameState = initGameState();
    gameState.turnNumber = 36;
    gameState.winner = "black";
    expect(checkIfDraw(gameState)).toBeFalsy();
  });

  it("should be true for turn number after 35", () => {
    let gameState = initGameState();
    gameState.turnNumber = 36;
    expect(checkIfDraw(gameState)).toBeTruthy();
  });

  it("should be false for turn number 35 and below", () => {
    let gameState = initGameState();
    gameState.turnNumber = 35;
    expect(checkIfDraw(gameState)).toBeFalsy();
  });
});
