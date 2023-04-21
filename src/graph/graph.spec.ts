import expect from "expect";
import {
  updateGraphState,
  corners,
  createGraph,
  checkOppositePath,
} from "./graph";
import { Board, updateBoardState } from "../board/board";
import { BLACK_PLAYER } from "../player/player";

const boardWithPath: Board = [
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

const boardWithoutPath: Board = [
  [
    undefined,
    undefined,
    undefined,
    { symbol: "B", color: "cyan" },
    { symbol: "A", color: "green" },
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
    { symbol: "C", color: "green" },
    { symbol: "E", color: "green" },
    { symbol: "D", color: "green" },
    undefined,
    undefined,
  ],
  [
    undefined,
    { symbol: "C", color: "cyan" },
    { symbol: "D", color: "blue" },
    { symbol: "C", color: "yellow" },
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
    },
    { symbol: "E", color: "yellow" },
    { symbol: "O", color: "grey", playedBy: null, lastPlayed: false },
    { symbol: "A", color: "yellow" },
  ],
  [
    undefined,
    { symbol: "F", color: "yellow" },
    { symbol: "E", color: "red" },
    { symbol: "E", color: "blue" },
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
    { symbol: "E", color: "cyan" },
    { symbol: "F", color: "red" },
    { symbol: "C", color: "red" },
    undefined,
    undefined,
    undefined,
  ],
];

describe("find a path", () => {
  it("should find a path between greens corners", () => {
    const graph = updateGraphState(BLACK_PLAYER, boardWithPath);
    expect(
      [
        "A-corner",
        "A-green",
        "C-green",
        "C-yellow",
        "C-magenta",
        "E-blue",
        "A-magenta",
        "E-cyan",
        "D-corner",
      ].join(",")
    ).toContain(checkOppositePath(graph).join(","));
  });
  it("should not find a path between greens corners", () => {
    const graph = updateGraphState(BLACK_PLAYER, boardWithoutPath);
    expect(checkOppositePath(graph)).toBeFalsy();
  });
});
