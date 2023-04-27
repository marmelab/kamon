import expect from "expect";
import { getMockFromJson } from "../mocks/getMock";
import { getOppositePath, updateGraphState } from "./graph";
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
