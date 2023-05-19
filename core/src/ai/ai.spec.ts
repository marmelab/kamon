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

  it("should highlight missing tiles for path", () => {
    const { state, board }: { state: GameState; board: Board } =
      getMockFromJson("games/almostPath.json");
    const updatedBoard = highlightMissingTilesForPath(
      state.currentPlayer,
      board,
    );
    expect(updatedBoard).toEqual([
      [
        null,
        null,
        null,
        { symbol: "A", color: "magenta", moveAllowed: undefined },
        { symbol: "A", color: "red", moveAllowed: undefined },
        {
          symbol: "B",
          color: "cyan",
          playedBy: "black",
          lastPlayed: false,
          moveAllowed: undefined,
        },
        { symbol: "C", color: "yellow", moveAllowed: undefined },
        null,
        null,
        null,
      ],
      [
        null,
        null,
        { symbol: "B", color: "blue", moveAllowed: undefined },
        { symbol: "D", color: "blue", moveAllowed: undefined },
        {
          symbol: "E",
          color: "red",
          playedBy: "black",
          moveAllowed: undefined,
        },
        { symbol: "D", color: "yellow", moveAllowed: undefined },
        { symbol: "B", color: "red", moveAllowed: undefined },
        null,
        null,
      ],
      [
        null,
        {
          symbol: "A",
          color: "green",
          playedBy: "white",
          lastPlayed: true,
          moveAllowed: undefined,
        },
        {
          symbol: "C",
          color: "red",
          playedBy: "white",
          lastPlayed: false,
          moveAllowed: undefined,
        },
        { symbol: "E", color: "green", moveAllowed: undefined },
        {
          symbol: "E",
          color: "magenta",
          playedBy: "black",
          lastPlayed: false,
          moveAllowed: undefined,
        },
        {
          symbol: "O",
          color: "grey",
          playedBy: null,
          moveAllowed: undefined,
        },
        { symbol: "B", color: "yellow", moveAllowed: undefined },
        null,
      ],
      [
        {
          symbol: "C",
          color: "blue",
          playedBy: "white",
          lastPlayed: false,
          moveAllowed: undefined,
        },
        { symbol: "D", color: "magenta", moveAllowed: undefined },
        { symbol: "F", color: "blue", moveAllowed: undefined },
        { symbol: "A", color: "yellow", moveAllowed: true },
        { symbol: "D", color: "cyan", moveAllowed: undefined },
        {
          symbol: "B",
          color: "magenta",
          playedBy: "white",
          lastPlayed: false,
          moveAllowed: undefined,
        },
        {
          symbol: "A",
          color: "blue",
          playedBy: "white",
          lastPlayed: false,
          moveAllowed: undefined,
        },
      ],
      [
        null,
        { symbol: "C", color: "green", moveAllowed: undefined },
        { symbol: "B", color: "green", moveAllowed: undefined },
        { symbol: "E", color: "cyan", moveAllowed: undefined },
        {
          symbol: "E",
          color: "yellow",
          playedBy: "black",
          lastPlayed: false,
          moveAllowed: undefined,
        },
        {
          symbol: "E",
          color: "blue",
          playedBy: "white",
          lastPlayed: false,
          moveAllowed: undefined,
        },
        { symbol: "A", color: "cyan", moveAllowed: undefined },
        null,
      ],
      [
        null,
        null,
        { symbol: "D", color: "red", moveAllowed: undefined },
        { symbol: "F", color: "red", moveAllowed: undefined },
        {
          symbol: "C",
          color: "cyan",
          playedBy: "black",
          lastPlayed: false,
          moveAllowed: undefined,
        },
        { symbol: "F", color: "magenta", moveAllowed: undefined },
        { symbol: "C", color: "magenta", moveAllowed: undefined },
        null,
        null,
      ],
      [
        null,
        null,
        null,
        { symbol: "F", color: "green", moveAllowed: undefined },
        {
          symbol: "D",
          color: "green",
          playedBy: "black",
          lastPlayed: false,
          moveAllowed: undefined,
        },
        { symbol: "F", color: "yellow", moveAllowed: undefined },
        { symbol: "F", color: "cyan", moveAllowed: undefined },
        null,
        null,
        null,
      ],
    ]);
  });
});
