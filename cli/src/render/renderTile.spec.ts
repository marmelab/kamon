import { renderTile } from "../render/renderTile";
import { Tile } from "@kamon/core/src/tile/tile";

describe("renderTile", () => {
  it("should render a tile", () => {
    const tile: Tile = { color: "blue", symbol: "A" };
    expect(renderTile(tile)).toMatch(/A/);
  });
});
