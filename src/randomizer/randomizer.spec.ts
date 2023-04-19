import expect from "expect";
import { initRandomGame, createUndefinedTiles } from "./randomizer";

describe("create undefined tiles", () => {
  it("should give an array of 1 undefined", () => {
    expect(createUndefinedTiles(1)).toContain(undefined);
  });

  it("should give an array of 3 undefined", () => {
    const undefinedTiles = createUndefinedTiles(3);
    expect(undefinedTiles).toContain(undefined);
    expect(undefinedTiles.length).toBe(3);
  });
});

describe("create random board config", () => {
  it("should give an array of 7 lines", () => {
    const boardConfig = initRandomGame();
    expect(boardConfig.length).toBe(7);
  });
});
