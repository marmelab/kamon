import { getMock } from "../mocks/getMock";
import { initGameState, winGame, checkIfGameWon } from "./state";

const mockFilledBoard = getMock("boards/filled.json");

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
