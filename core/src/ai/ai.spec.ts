import { Board } from "../board";
import { GameState } from "../game";
import { getMockFromJson } from "../mocks/getMock";
import { getBlockedTiles, getMissingTilesForPath } from "./ai";

describe("findNextMoveForPath", () => {
  it("should find 1 missing tile for path", () => {
    const { state, board }: { state: GameState; board: Board } =
      getMockFromJson("games/almostPath.json");
    const tiles = getMissingTilesForPath(state.currentPlayer, board);
    expect(tiles).toEqual([{ symbol: "A", color: "yellow" }]);
  });

  it("should find 2 missing tiles for path", () => {
    const { state, board }: { state: GameState; board: Board } =
      getMockFromJson("games/almostPath2.json");
    const tiles = getMissingTilesForPath(state.currentPlayer, board);
    expect(tiles).toEqual([
      { symbol: "E", color: "cyan" },
      { symbol: "E", color: "yellow" },
    ]);
  });

  it("should not find missing tile for path", () => {
    const { state, board }: { state: GameState; board: Board } =
      getMockFromJson("games/impossiblePath.json");
    const tiles = getMissingTilesForPath(state.currentPlayer, board);
    expect(tiles).toEqual([]);
  });
});

describe("findNextMoveToBlockOpponent", () => {
  it("should find 1 tile", () => {
    const { state, board }: { state: GameState; board: Board } =
      getMockFromJson("games/almostBlocked.json");

    expect(getBlockedTiles(board, state.currentPlayer)).toEqual([
      { symbol: "D", color: "magenta" },
    ]);
  });
});
