import { NullableTile, Tile } from "@kamon/core";
import { renderLine } from "../render/renderLine";

describe("renderLine", () => {
  it("should render a line with blank characters", () => {
    const tile: Tile = { color: "blue", symbol: "A" };
    const line: NullableTile[] = [undefined, tile, undefined];
    expect(renderLine(line)).toMatch(/\s.*A.*\s/);
  });
});
