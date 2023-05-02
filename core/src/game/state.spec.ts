import { WHITE_PLAYER } from "../player";
import { initGameState, updateRemainingTiles } from "./state";

describe("updateRemainingTiles", () => {
  it("should remove a tile from black at the begining", () => {
    const initialGameState = initGameState();
    const updatedGameState = updateRemainingTiles(initialGameState);
    expect(updatedGameState.remainingTiles).toEqual({
      black: 17,
      white: 18,
    });
  });

  it("should remove tile from white if white is current player", () => {
    let testGameState = initGameState();
    testGameState.currentPlayer = WHITE_PLAYER;

    const updatedGameState = updateRemainingTiles(testGameState);
    expect(updatedGameState.remainingTiles).toEqual({ black: 18, white: 17 });
  });

  it("should remove no tile if there is no current player", () => {
    let testGameState = initGameState();
    testGameState.currentPlayer = null;

    const updatedGameState = updateRemainingTiles(testGameState);
    expect(updatedGameState.remainingTiles).toEqual({ black: 18, white: 18 });
  });
});
