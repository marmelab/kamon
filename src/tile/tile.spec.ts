import expect from "expect";

import { Tile, checkIfCoordsExist, findSiblings, renderTile } from "./tile";
import { BLACK_PLAYER } from "../player/player";
import { getMockFromJson } from "../mocks/getMock";

describe("renderTile", () => {
  it("should render a tile", () => {
    const tile: Tile = { color: "blue", symbol: "A" };
    expect(renderTile(tile)).toMatch(/A/);
  });
});

describe("Find siblings played by black around a tile", () => {
  it("should find 6 siblings on middle matching black player", () => {
    const board = getMockFromJson("boards/middleSiblings.json");
    const siblings = findSiblings(board, { x: 3, y: 3 }, BLACK_PLAYER);

    expect(siblings.next).toEqual({
      symbol: "E",
      color: "yellow",
      playedBy: "black",
      lastPlayed: false,
    });
    expect(siblings.previous).toEqual({
      symbol: "B",
      color: "red",
      playedBy: "black",
      lastPlayed: false,
    });
    expect(siblings.bottomLeft).toEqual({
      symbol: "E",
      color: "blue",
      playedBy: "black",
      lastPlayed: false,
    });
    expect(siblings.bottomRight).toEqual({
      symbol: "F",
      color: "green",
      playedBy: "black",
      lastPlayed: false,
    });
    expect(siblings.topLeft).toEqual({
      symbol: "C",
      color: "yellow",
      playedBy: "black",
      lastPlayed: false,
    });
    expect(siblings.topRight).toEqual({
      symbol: "B",
      color: "yellow",
      playedBy: "black",
      lastPlayed: false,
    });
  });
  it("should find 6 siblings on middle left matching black player", () => {
    const board = getMockFromJson("boards/middleLeftSiblings.json");
    const siblings = findSiblings(board, { x: 3, y: 1 }, BLACK_PLAYER);

    expect(siblings.next).toEqual({
      symbol: "B",
      color: "red",
      playedBy: "black",
      lastPlayed: false,
    });
    expect(siblings.previous).toEqual({
      symbol: "D",
      color: "red",
      playedBy: "black",
      lastPlayed: false,
    });
    expect(siblings.bottomLeft).toEqual({
      symbol: "F",
      color: "yellow",
      playedBy: "black",
      lastPlayed: false,
    });
    expect(siblings.bottomRight).toEqual({
      symbol: "E",
      color: "red",
      playedBy: "black",
      lastPlayed: false,
    });
    expect(siblings.topLeft).toEqual({
      symbol: "C",
      color: "cyan",
      playedBy: "black",
      lastPlayed: false,
    });
    expect(siblings.topRight).toEqual({
      symbol: "D",
      color: "blue",
      playedBy: "black",
      lastPlayed: false,
    });
  });
  it("should find 6 siblings on middle top matching black player", () => {
    const board = getMockFromJson("boards/middleTopSiblings.json");
    const siblings = findSiblings(board, { x: 1, y: 4 }, BLACK_PLAYER);

    expect(siblings.next).toEqual({
      symbol: "E",
      color: "green",
      playedBy: "black",
      lastPlayed: false,
    });
    expect(siblings.previous).toEqual({
      symbol: "F",
      color: "blue",
      playedBy: "black",
      lastPlayed: false,
    });
    expect(siblings.bottomLeft).toEqual({
      symbol: "C",
      color: "yellow",
      playedBy: "black",
      lastPlayed: false,
    });
    expect(siblings.bottomRight).toEqual({
      symbol: "B",
      color: "yellow",
      playedBy: "black",
      lastPlayed: false,
    });
    expect(siblings.topLeft).toEqual({
      symbol: "A",
      color: "green",
      playedBy: "black",
      lastPlayed: false,
    });
    expect(siblings.topRight).toEqual({
      symbol: "D",
      color: "cyan",
      playedBy: "black",
      lastPlayed: false,
    });
  });
  it("should find 6 siblings on middle bottom matching black player", () => {
    const board = getMockFromJson("boards/middleBottomSiblings.json");
    const siblings = findSiblings(board, { x: 5, y: 4 }, BLACK_PLAYER);
    expect(siblings.next).toEqual({
      symbol: "B",
      color: "magenta",
      playedBy: "black",
      lastPlayed: false,
    });
    expect(siblings.previous).toEqual({
      symbol: "D",
      color: "magenta",
      playedBy: "black",
      lastPlayed: false,
    });
    expect(siblings.bottomLeft).toEqual({
      symbol: "E",
      color: "cyan",
      playedBy: "black",
      lastPlayed: false,
    });
    expect(siblings.bottomRight).toEqual({
      symbol: "F",
      color: "red",
      playedBy: "black",
      lastPlayed: false,
    });
    expect(siblings.topLeft).toEqual({
      symbol: "E",
      color: "blue",
      playedBy: "black",
      lastPlayed: false,
    });
    expect(siblings.topRight).toEqual({
      symbol: "F",
      color: "green",
      playedBy: "black",
      lastPlayed: false,
    });
  });
  it("should find 3 siblings matching black player", () => {
    const board = getMockFromJson("boards/rightSiblings.json");
    const siblings = findSiblings(board, { x: 4, y: 6 }, BLACK_PLAYER);

    expect(siblings.next).toBeNull();
    expect(siblings.previous).toBeNull();
    expect(siblings.bottomLeft).toEqual({
      symbol: "B",
      color: "green",
      playedBy: "black",
      lastPlayed: false,
    });
    expect(siblings.bottomRight).toBeNull();
    expect(siblings.topLeft).toEqual({
      symbol: "B",
      color: "cyan",
      playedBy: "black",
      lastPlayed: false,
    });
    expect(siblings.topRight).toEqual({
      symbol: "A",
      color: "yellow",
      playedBy: "black",
      lastPlayed: false,
    });
  });
});

describe("Check if coords exist in a board", () => {
  const board = getMockFromJson("boards/rightSiblings.json");
  it("coords should not exist", () => {
    const exist = checkIfCoordsExist(board, { x: 1, y: 1 });
    expect(exist).toBeFalsy();
  });
  it("coords should exist", () => {
    const exist = checkIfCoordsExist(board, { x: 1, y: 4 });
    expect(exist).toBeTruthy();
  });
});
