import { Board } from "../board";
import { GameState } from "../game";
import { getMockFromJson } from "../mocks/getMock";
import { getMissingTilesForPath } from "./ai";

describe("findNextMove", () => {
  it("should find missing tiles for path", () => {
    const { state, board }: { state: GameState; board: Board } =
      getMockFromJson("games/almostPath.json");
    const tiles = getMissingTilesForPath(state.currentPlayer, board);
    expect(tiles).toEqual([
      { symbol: "A", color: "yellow" },
      { symbol: "D", color: "cyan" },
    ]);
  });
});
