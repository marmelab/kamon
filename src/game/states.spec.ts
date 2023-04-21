import { checkIfDraw, initGameState } from "./state";

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
