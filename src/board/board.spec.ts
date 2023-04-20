import { Tile, renderTile } from "../tile/tile";
import { renderLine, Board, renderBoard, NullableTile } from "./board";

describe("renderLine", () => {
  it("should render a line with blank characters", () => {
    const tile: Tile = { color: "blue", symbol: "A" };
    const line: NullableTile[] = [undefined, tile, undefined];
    expect(renderLine(line)).toMatch(/\s.*A.*\s/);
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
