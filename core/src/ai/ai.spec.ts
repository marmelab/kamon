import { Board } from "../board";
import { GameState } from "../game";
import { getMockFromJson } from "../mocks/getMock";
import { getBlockedTiles, getMissingTilesForPath, findBestPath } from "./ai";

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

  it("should find best path", () => {
    const { state, board }: { state: GameState; board: Board } =
      getMockFromJson("games/almostPath3.json");
    const paths = findBestPath(state.currentPlayer, board);
    paths.forEach((path) => {
      expect(path.weight).toBe(1);
      delete path.weight;
      expect(path).toEqual([
        "green-start",
        "B-cyan",
        "E-red",
        "E-magenta",
        "A-yellow",
        "E-cyan",
        "C-cyan",
        "D-green",
        "green-end",
      ]);
    });
  });
});

describe("findNextMoveToBlockOpponent", () => {
  it("should find 1 tile", () => {
    const { state, board }: { state: GameState; board: Board } =
      getMockFromJson("games/almostBlocked.json");

    expect(getBlockedTiles(state.currentPlayer, board)).toEqual([
      { symbol: "D", color: "magenta" },
    ]);
  });
});

describe("findNextMoveToPathAndBlock", () => {
  it("should find 2 tiles that make a path or block opponent", () => {
    const { state, board }: { state: GameState; board: Board } =
      getMockFromJson("games/almostPathAndBlocked.json");

    expect(getBlockedTiles(state.currentPlayer, board)).toEqual([
      { symbol: "D", color: "magenta" },
    ]);

    expect(getMissingTilesForPath(state.currentPlayer, board)).toEqual([
      { symbol: "F", color: "blue" },
    ]);
  });
});
