import expect from "expect";
import { Tile, checkIfCoordsExist, findSiblings, renderTile } from "./tile";
import { BLACK_PLAYER } from "../player/player";
import { getMockFromJson } from "../mocks/getMock";

const board = getMockFromJson("boards/greenToGreenPath.json");

describe("renderTile", () => {
  it("should render a tile", () => {
    const tile: Tile = { color: "blue", symbol: "A" };
    expect(renderTile(tile)).toMatch(/A/);
  });
});

describe("Find siblings around a tile", () => {
  it("should find 6 sibling matching", () => {
    const siblings = findSiblings(board, { x: 1, y: 4 });
    expect(siblings.next).toBeDefined();
    expect(siblings.previous).toBeDefined();
    expect(siblings.bottomLeft).toBeDefined();
    expect(siblings.bottomRight).toBeDefined();
    expect(siblings.topLeft).toBeDefined();
    expect(siblings.topRight).toBeDefined();
  });
  it("should find 1 sibling matching a player", () => {
    const siblings = findSiblings(board, { x: 1, y: 4 }, BLACK_PLAYER);
    expect(siblings.next).toBeNull();
    expect(siblings.topLeft).toBeDefined();
    expect(siblings.previous).toBeNull();
    expect(siblings.bottomLeft).toBeNull();
    expect(siblings.bottomRight).toBeNull();
    expect(siblings.topRight).toBeNull();
  });
  it("should find 2 sibling matching a player", () => {
    const siblings = findSiblings(board, { x: 3, y: 3 }, BLACK_PLAYER);
    expect(siblings.next).toBeNull();
    expect(siblings.topLeft).toBeDefined();
    expect(siblings.previous).toBeNull();
    expect(siblings.bottomLeft).toBeDefined();
    expect(siblings.bottomRight).toBeNull();
    expect(siblings.topRight).toBeNull();
  });
});

describe("Check if coords exist in a board", () => {
  it("coords should not exist", () => {
    const exist = checkIfCoordsExist(board, { x: 1, y: 1 });
    expect(exist).toBeFalsy();
  });
  it("coords should exist", () => {
    const exist = checkIfCoordsExist(board, { x: 1, y: 4 });
    expect(exist).toBeTruthy();
  });
});
