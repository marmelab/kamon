import expect from "expect";
import {
  Tile,
  checkIfCoordsExist,
  findSiblings,
  findTile,
  renderTile,
} from "./tile";
import { Board } from "../board/board";
import { BLACK_PLAYER } from "../player/player";
import { line } from "blessed";

const board: Board = [
  [
    undefined,
    undefined,
    undefined,
    { symbol: "B", color: "cyan" },
    { symbol: "A", color: "green", playedBy: BLACK_PLAYER, lastPlayed: false },
    { symbol: "D", color: "cyan" },
    { symbol: "A", color: "red" },
    undefined,
    undefined,
    undefined,
  ],
  [
    undefined,
    undefined,
    { symbol: "E", color: "magenta" },
    { symbol: "F", color: "blue" },
    { symbol: "C", color: "green", playedBy: BLACK_PLAYER, lastPlayed: false },
    { symbol: "E", color: "green" },
    { symbol: "D", color: "green" },
    undefined,
    undefined,
  ],
  [
    undefined,
    { symbol: "C", color: "cyan" },
    { symbol: "D", color: "blue" },
    { symbol: "C", color: "yellow", playedBy: BLACK_PLAYER, lastPlayed: false },
    { symbol: "B", color: "yellow" },
    { symbol: "B", color: "blue" },
    { symbol: "A", color: "cyan" },
    undefined,
  ],
  [
    { symbol: "D", color: "red" },
    { symbol: "F", color: "cyan" },
    { symbol: "B", color: "red" },
    {
      symbol: "C",
      color: "magenta",
      playedBy: BLACK_PLAYER,
      lastPlayed: false,
    },
    { symbol: "E", color: "yellow" },
    { symbol: "O", color: "grey", playedBy: null, lastPlayed: false },
    { symbol: "A", color: "yellow" },
  ],
  [
    undefined,
    { symbol: "F", color: "yellow" },
    { symbol: "E", color: "red" },
    { symbol: "E", color: "blue", playedBy: BLACK_PLAYER, lastPlayed: false },
    { symbol: "F", color: "green" },
    { symbol: "D", color: "yellow" },
    { symbol: "F", color: "magenta" },
    undefined,
  ],
  [
    undefined,
    undefined,
    { symbol: "A", color: "blue" },
    { symbol: "D", color: "magenta" },
    {
      symbol: "A",
      color: "magenta",
      playedBy: BLACK_PLAYER,
      lastPlayed: false,
    },
    { symbol: "B", color: "magenta" },
    { symbol: "B", color: "green" },
    undefined,
    undefined,
  ],
  [
    undefined,
    undefined,
    undefined,
    { symbol: "C", color: "blue" },
    { symbol: "E", color: "cyan", playedBy: BLACK_PLAYER, lastPlayed: false },
    { symbol: "F", color: "red" },
    { symbol: "C", color: "red" },
    undefined,
    undefined,
    undefined,
  ],
];

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
