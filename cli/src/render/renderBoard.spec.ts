import { Board } from "@kamon/core/src/board/board";
import { renderBoard } from "./renderBoard";

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
