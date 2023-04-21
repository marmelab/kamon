import expect from "expect";
import { updateGraphState, checkOppositePath } from "./graph";
import { BLACK_PLAYER } from "../player/player";
import { getMock } from "../mocks/getMock";

const boardWithPath = getMock("boards/greenToGreenPath.json");

describe("find a path", () => {
  it("should find a path between greens corners", () => {
    const graph = updateGraphState(BLACK_PLAYER, boardWithPath);
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
      ].join(",")
    ).toEqual(checkOppositePath(graph).join(","));
  });
});
