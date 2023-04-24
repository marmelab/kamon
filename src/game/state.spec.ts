import { getMockFromJson } from "../mocks/getMock";
import { initGameState, winGame, checkIfGameWon, checkIfDraw } from "./state";

const mockFilledBoard = getMockFromJson("boards/filled.json");

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
