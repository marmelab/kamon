import { initGameState, winGame, checkIfGameWon } from "./state";

describe("winGame", () => {
  it("should set player as winner", () => {
    expect(winGame("black", initGameState()).winner).toBe("black");
  });

  it("should stop game", () => {
    expect(winGame("black", initGameState()).isRunning).toBeFalsy;
  });
});

describe("checkIfGameIsWon", () => {
  it("should win game when there is no remaining move", () => {
    expect(checkIfGameWon(initGameState(), [])).toBeTruthy;
  });
});
