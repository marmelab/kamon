import expect from "expect";
import { initNewGame, createUndefinedTiles } from "./randomizer";

describe("randomize test", () => {
  it("should give an array of 1 undefined", () => {
    expect(createUndefinedTiles(1)).toContain(undefined);
  });

  it("should give an array of 3 undefined", () => {
    const undefinedTiles = createUndefinedTiles(3);
    expect(undefinedTiles).toContain(undefined);
    expect(undefinedTiles.length).toBe(3);
  });

  it("should give an array of 7 lines", () => {
    const boardConfig = initNewGame();
    expect(boardConfig.length).toBe(7);
  });
});
