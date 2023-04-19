import { Board, NullableTile } from "../board/board";
import { Tile } from "../tile/tile";
import { checkIfMoveIsAllowed } from "./move";

describe("checkIfMoveIsAllowed", () => {
  it("should block move on unallowed first move tile", () => {
    const tile: Tile = { color: "blue", symbol: "A" };
    const line: NullableTile[] = [undefined, tile, undefined];
    const board: Board = [line];
    expect(
      checkIfMoveIsAllowed({ x: 1, y: 3, isFirstMove: true }, board)
    ).toBeFalsy();
  });

  it("should allow move on highlighted tiles", () => {
    const tile: Tile = { color: "blue", symbol: "A" };
    const line: NullableTile[] = [undefined, tile, undefined];
    const board: Board = [line];
    expect(
      checkIfMoveIsAllowed({ x: 1, y: 0, isFirstMove: true }, board)
    ).toBeTruthy();
  });
});
