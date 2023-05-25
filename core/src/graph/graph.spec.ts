import expect from "expect";
import { getMockFromJson } from "../mocks/getMock";
import { createGraph, getOppositePath, updateGraphState } from "./graph";
import { BLACK_PLAYER } from "../player/player";

describe("find a path", () => {
  it("should find a path between green corners", () => {
    const board = getMockFromJson("games/greenToGreenPath.json");
    const graph = updateGraphState(BLACK_PLAYER, board);
    expect(
      [
        "green-start",
        "A-green",
        "C-green",
        "C-yellow",
        "C-magenta",
        "E-blue",
        "A-magenta",
        "E-cyan",
        "green-end",
      ].join(","),
    ).toEqual(getOppositePath(graph).join(","));
  });

  it("should find a path between yellow corners", () => {
    const board = getMockFromJson("games/yellowToYellowPath.json");
    const graph = updateGraphState(BLACK_PLAYER, board);
    expect(
      [
        "yellow-start",
        "E-magenta",
        "D-blue",
        "C-yellow",
        "C-magenta",
        "F-green",
        "D-yellow",
        "B-green",
        "yellow-end",
      ].join(","),
    ).toEqual(getOppositePath(graph).join(","));
  });

  it("should find a path between blue corners", () => {
    const board = getMockFromJson("games/blueToBluePath.json");
    const graph = updateGraphState(BLACK_PLAYER, board);
    expect(
      [
        "blue-start",
        "A-blue",
        "D-magenta",
        "E-blue",
        "C-magenta",
        "B-yellow",
        "E-green",
        "D-green",
        "blue-end",
      ].join(","),
    ).toEqual(getOppositePath(graph).join(","));
  });

  it("should find a path between left to right corners", () => {
    const board = getMockFromJson("games/leftToRightPath.json");
    const graph = updateGraphState(BLACK_PLAYER, board);
    expect(
      [
        "blue-start",
        "D-red",
        "F-cyan",
        "B-red",
        "C-magenta",
        "E-yellow",
        "B-cyan",
        "A-yellow",
        "blue-end",
      ].join(","),
    ).toEqual(getOppositePath(graph).join(","));
  });

  it("should find a path between top right to bottom left corners", () => {
    const board = getMockFromJson("games/topRightToBottomLeftPath.json");
    const graph = updateGraphState(BLACK_PLAYER, board);
    expect(
      [
        "green-start",
        "A-red",
        "E-green",
        "B-yellow",
        "C-magenta",
        "E-blue",
        "D-magenta",
        "C-blue",
        "green-end",
      ].join(","),
    ).toEqual(getOppositePath(graph).join(","));
  });

  it("should find a path between top left to bottom right corners", () => {
    const board = getMockFromJson("games/topLeftToBottomRightPath.json");
    const graph = updateGraphState(BLACK_PLAYER, board);
    expect(
      [
        "green-start",
        "B-cyan",
        "F-blue",
        "C-yellow",
        "C-magenta",
        "F-green",
        "B-magenta",
        "C-red",
        "green-end",
      ].join(","),
    ).toEqual(getOppositePath(graph).join(","));
  });

  it("should not validate a path between two corners if it's incomplete", () => {
    const board = getMockFromJson("games/incompletePath.json");
    const graph = updateGraphState(BLACK_PLAYER, board);
    expect(getOppositePath(graph)).toHaveLength(0);
  });
});

describe("createGraph", () => {
  it("should create a graph with all external tiles connected", () => {
    const game = getMockFromJson("games/empty.json");
    const graph = createGraph(game.board, BLACK_PLAYER);
    const serialized = graph.serialize();
    expect(serialized.links.length).toBe(24);
    expect(serialized).toEqual({
      nodes: [
        { id: "green-start" },
        { id: "A-magenta" },
        { id: "A-red" },
        { id: "B-cyan" },
        { id: "C-yellow" },
        { id: "green-end" },
        { id: "blue-start" },
        { id: "C-blue" },
        { id: "C-green" },
        { id: "D-red" },
        { id: "F-green" },
        { id: "blue-end" },
        { id: "yellow-start" },
        { id: "B-blue" },
        { id: "A-green" },
        { id: "yellow-end" },
        { id: "B-red" },
        { id: "B-yellow" },
        { id: "A-blue" },
        { id: "A-cyan" },
        { id: "C-magenta" },
        { id: "F-cyan" },
        { id: "D-green" },
        { id: "F-yellow" },
      ],
      links: [
        { source: "green-start", target: "A-magenta", weight: 1 },
        { source: "green-start", target: "A-red", weight: 1 },
        { source: "green-start", target: "B-cyan", weight: 1 },
        { source: "green-start", target: "C-yellow", weight: 1 },
        { source: "C-yellow", target: "blue-end", weight: 0 },
        { source: "blue-start", target: "C-blue", weight: 1 },
        { source: "blue-start", target: "C-green", weight: 1 },
        { source: "blue-start", target: "D-red", weight: 1 },
        { source: "blue-start", target: "F-green", weight: 1 },
        { source: "F-green", target: "green-end", weight: 0 },
        { source: "yellow-start", target: "A-magenta", weight: 1 },
        { source: "yellow-start", target: "B-blue", weight: 1 },
        { source: "yellow-start", target: "A-green", weight: 1 },
        { source: "yellow-start", target: "C-blue", weight: 1 },
        { source: "B-red", target: "blue-end", weight: 0 },
        { source: "B-yellow", target: "blue-end", weight: 0 },
        { source: "A-blue", target: "blue-end", weight: 0 },
        { source: "A-blue", target: "yellow-end", weight: 0 },
        { source: "A-cyan", target: "yellow-end", weight: 0 },
        { source: "C-magenta", target: "yellow-end", weight: 0 },
        { source: "F-cyan", target: "yellow-end", weight: 0 },
        { source: "F-cyan", target: "green-end", weight: 0 },
        { source: "D-green", target: "green-end", weight: 0 },
        { source: "F-yellow", target: "green-end", weight: 0 },
      ],
    });
  });

  it("should create a graph with only empty and black external tiles connected", () => {
    const game = getMockFromJson("games/externalTilesArePlayed.json");
    const graph = createGraph(game.board, BLACK_PLAYER);
    const serialized = graph.serialize();

    expect(serialized.links.length).toBe(20);
    expect(serialized).toEqual({
      nodes: [
        { id: "green-start" },
        { id: "A-magenta" },
        { id: "B-cyan" },
        { id: "C-yellow" },
        { id: "green-end" },
        { id: "blue-start" },
        { id: "C-blue" },
        { id: "D-red" },
        { id: "F-green" },
        { id: "blue-end" },
        { id: "yellow-start" },
        { id: "B-blue" },
        { id: "A-green" },
        { id: "yellow-end" },
        { id: "B-red" },
        { id: "B-yellow" },
        { id: "A-blue" },
        { id: "C-magenta" },
        { id: "F-cyan" },
        { id: "D-green" },
      ],
      links: [
        { source: "green-start", target: "A-magenta", weight: 0 },
        { source: "green-start", target: "B-cyan", weight: 1 },
        { source: "green-start", target: "C-yellow", weight: 1 },
        { source: "C-yellow", target: "blue-end", weight: 0 },
        { source: "blue-start", target: "C-blue", weight: 0 },
        { source: "blue-start", target: "D-red", weight: 0 },
        { source: "blue-start", target: "F-green", weight: 0 },
        { source: "F-green", target: "green-end", weight: 0 },
        { source: "yellow-start", target: "A-magenta", weight: 0 },
        { source: "yellow-start", target: "B-blue", weight: 1 },
        { source: "yellow-start", target: "A-green", weight: 0 },
        { source: "yellow-start", target: "C-blue", weight: 0 },
        { source: "B-red", target: "blue-end", weight: 0 },
        { source: "B-yellow", target: "blue-end", weight: 0 },
        { source: "A-blue", target: "blue-end", weight: 0 },
        { source: "A-blue", target: "yellow-end", weight: 0 },
        { source: "C-magenta", target: "yellow-end", weight: 0 },
        { source: "F-cyan", target: "yellow-end", weight: 0 },
        { source: "F-cyan", target: "green-end", weight: 0 },
        { source: "D-green", target: "green-end", weight: 0 },
      ],
    });
  });
});
