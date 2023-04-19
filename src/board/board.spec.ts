import { Tile, renderTile } from "../tile/tile";
import {
  renderLine,
  Board,
  renderBoard,
  NullableTile,
  getTileFromCoordinates,
} from "./board";

describe("renderLine", () => {
  it("should render a line with blank characters", () => {
    const tile: Tile = { color: "blue", symbol: "A" };
    const line: NullableTile[] = [undefined, tile, undefined];
    expect(renderLine(line, 0)).toMatch(/\s.*A.*\s/);
  });
});

describe("getTileFromCoordinates", () => {
  it("should fetch the A character inside board below", () => {
    const tileA: Tile = { color: "blue", symbol: "A" };
    const tileB: Tile = { color: "blue", symbol: "B" };
    const line: NullableTile[] = [undefined, undefined, tileA, tileB];
    const board: Board = [line];

    expect(getTileFromCoordinates({ x: 0, y: 0 }, board)).toBe(tileA);
  });
});

describe("renderBoard", () => {
  it("should render a board", () => {
    const board: Board = [
      [
        undefined,
        { color: "red", symbol: "A" },
        { color: "blue", symbol: "A" },
      ],
      [
        { color: "red", symbol: "A" },
        { color: "blue", symbol: "C" },
        { color: "red", symbol: "B" },
      ],
      [
        { color: "blue", symbol: "C" },
        { color: "yellow", symbol: "A" },
        undefined,
      ],
    ];
    expect(() => renderBoard(board)).not.toThrow();
  });
});
