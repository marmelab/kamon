import { NullableTile } from "@kamon/core/src/board/board";
import { renderLine } from "../render/renderLine";
import { Tile } from "@kamon/core/src/tile/tile";

describe("renderLine", () => {
  it("should render a line with blank characters", () => {
    const tile: Tile = { color: "blue", symbol: "A" };
    const line: NullableTile[] = [undefined, tile, undefined];
    expect(renderLine(line)).toMatch(/\s.*A.*\s/);
  });
});
