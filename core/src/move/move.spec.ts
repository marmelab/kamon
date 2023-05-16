import { initGameState } from "../game/state";
import { checkUserMove, getPlayableTilesForNextMove } from "./move";
import { GameState } from "../game/state";
import { Tile } from "../tile/tile";
import { WHITE_PLAYER } from "../player/player";
import { getMockFromJson } from "../mocks/getMock";

const mockBoard = getMockFromJson("games/gameBegin.json");

describe("checkUserMove", () => {
  it("should, on first move, unallow to play first tile", () => {
    const initialGameState: GameState = initGameState();
    const tile: Tile = { symbol: "E", color: "blue" };
    const { gameState, allowedMove } = checkUserMove(
      mockBoard,
      tile,
      initialGameState,
    );
    expect(allowedMove).toBeFalsy();
  });

  it("should, on first move, allow to play second tile", () => {
    const initialGameState: GameState = initGameState();
    const tile: Tile = { symbol: "A", color: "yellow" };
    const { gameState, allowedMove } = checkUserMove(
      mockBoard,
      tile,
      initialGameState,
    );
    expect(allowedMove).toBeTruthy();
  });

  it("should, after first move, allow it if symbol is the same", () => {
    const initialGameState: GameState = {
      currentPlayer: WHITE_PLAYER,
      isRunning: true,
      winner: null,
      turnNumber: 1,
      isDraw: false,
      isPath: false,
      isLoop: false,
      remainingTiles: {
        black: 18,
        white: 18,
      },
      message: "",
    };
    const tile: Tile = { symbol: "D", color: "red" };
    const { gameState, allowedMove } = checkUserMove(
      mockBoard,
      tile,
      initialGameState,
    );
    expect(allowedMove).toBeTruthy();
  });

  it("should, after first move, allow it if color is the same ", () => {
    const initialGameState: GameState = {
      currentPlayer: WHITE_PLAYER,
      isRunning: true,
      winner: null,
      turnNumber: 1,
      isDraw: false,
      isPath: false,
      isLoop: false,
      remainingTiles: {
        black: 18,
        white: 18,
      },
      message: "",
    };
    const tile: Tile = { symbol: "A", color: "cyan" };
    const { gameState, allowedMove } = checkUserMove(
      mockBoard,
      tile,
      initialGameState,
    );
    expect(allowedMove).toBeTruthy();
  });

  it("should, after first move, unallow it if both color and symbol are different from lastPlayed", () => {
    const initialGameState: GameState = {
      currentPlayer: WHITE_PLAYER,
      isRunning: true,
      winner: null,
      turnNumber: 1,
      isDraw: false,
      isPath: false,
      isLoop: false,
      remainingTiles: {
        black: 18,
        white: 18,
      },
      message: "",
    };
    const tile: Tile = { symbol: "E", color: "green" };
    const { gameState, allowedMove } = checkUserMove(
      mockBoard,
      tile,
      initialGameState,
    );
    expect(allowedMove).toBeFalsy();
  });
});

describe("getPlayableTilesForNextMove", () => {
  it("shouldn't have any possibility for lone tile", () => {
    const playableTiles = getPlayableTilesForNextMove(mockBoard, {
      symbol: "O",
      color: "grey",
    });

    expect(playableTiles.length).toEqual(0);
  });

  it("should have 6 possible moves for red D tile", () => {
    const playableTiles = getPlayableTilesForNextMove(mockBoard, {
      symbol: "D",
      color: "red",
    });

    const mockPlayableTiles = [
      { color: "red", symbol: "D" },
      { color: "green", symbol: "D" },
      { color: "magenta", symbol: "D" },
      { color: "yellow", symbol: "D" },
      { color: "red", symbol: "A" },
      { color: "red", symbol: "A" },
    ];

    mockPlayableTiles.forEach((tile) => {
      expect(playableTiles).toContainEqual(tile);
    });
  });
});
