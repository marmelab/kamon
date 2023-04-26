import expect from "expect";
import { initRandomGame, createNullableTiles } from "./randomizer";

describe("create undefined tiles", () => {
  it("should give an array of 1 undefined", () => {
    expect(createNullableTiles(1)).toContain(null);
  });

  it("should give an array of 3 undefined", () => {
    const undefinedTiles = createNullableTiles(3);
    expect(undefinedTiles).toContain(null);
    expect(undefinedTiles.length).toBe(3);
  });
});

describe("create random board config", () => {
  it("should give an array of 7 lines", () => {
    const boardConfig = initRandomGame();
    expect(boardConfig.length).toBe(7);
  });
});
