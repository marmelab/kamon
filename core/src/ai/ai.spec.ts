import { Board } from "../board";
import { GameState } from "../game";
import { getMockFromJson } from "../mocks/getMock";
import { getMissingTilesForPath, highlightMissingTilesForPath } from "./ai";

describe("findNextMove", () => {
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
    console.log(tiles);
    expect(tiles).toEqual([
      { symbol: "E", color: "cyan" },
      { symbol: "E", color: "yellow" },
    ]);
  });
});
