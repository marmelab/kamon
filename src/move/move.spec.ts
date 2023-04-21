import exp from "constants";
import { Board } from "../board/board";
import { initGameState } from "../game/state";
import { initRandomGame } from "../randomizer/randomizer";
import { checkUserMove, getPlayableTilesForNextMove } from "./move";
import { GameState } from "../game/state";
import { Tile } from "../tile/tile";
import { BLACK_PLAYER, WHITE_PLAYER } from "../player/player";

const mockBoard: Board = [
  [
    undefined,
    undefined,
    undefined,
    { symbol: "E", color: "blue" },
    { symbol: "A", color: "yellow" },
    { symbol: "A", color: "blue" },
    { symbol: "C", color: "blue" },
    undefined,
    undefined,
    undefined,
  ],
  [
    undefined,
    undefined,
    { symbol: "A", color: "magenta" },
    { symbol: "A", color: "cyan" },
    { symbol: "A", color: "green" },
    { symbol: "D", color: "red" },
    { symbol: "A", color: "green" },
    undefined,
    undefined,
  ],
  [
    undefined,
    { symbol: "E", color: "cyan" },
    { symbol: "B", color: "yellow" },
    { symbol: "E", color: "blue" },
    { symbol: "D", color: "green" },
    { symbol: "F", color: "blue" },
    { symbol: "F", color: "yellow" },
    undefined,
  ],
  [
    { symbol: "D", color: "cyan", playedBy: "black", lastPlayed: true },
    { symbol: "O", color: "grey", playedBy: null, lastPlayed: false },
    { symbol: "C", color: "green" },
    { symbol: "C", color: "cyan" },
    { symbol: "E", color: "yellow" },
    { symbol: "F", color: "blue" },
    { symbol: "B", color: "cyan" },
  ],
  [
    undefined,
    { symbol: "B", color: "green" },
    { symbol: "D", color: "magenta" },
    { symbol: "A", color: "green" },
    { symbol: "A", color: "blue" },
    { symbol: "D", color: "yellow" },
    { symbol: "C", color: "yellow" },
    undefined,
  ],
  [
    undefined,
    undefined,
    { symbol: "B", color: "yellow" },
    { symbol: "E", color: "green" },
    undefined,
    undefined,
  ],
  [
    undefined,
    undefined,
    undefined,
    { symbol: "B", color: "green" },
    { symbol: "A", color: "red" },
    { symbol: "F", color: "green" },
    { symbol: "A", color: "red" },
    undefined,
    undefined,
    undefined,
  ],
];

describe("checkUserMove", () => {
  it("should, on first move, unallow to play first tile", () => {
    const initialGameState: GameState = initGameState();
    const tile: Tile = { symbol: "E", color: "blue" };
    const { gameState, allowedMove } = checkUserMove(
      mockBoard,
      { value: tile },
      initialGameState
    );
    expect(allowedMove).toBeFalsy();
  });

  it("should, on first move, allow to play second tile", () => {
    const initialGameState: GameState = initGameState();
    const tile: Tile = { symbol: "A", color: "yellow" };
    const { gameState, allowedMove } = checkUserMove(
      mockBoard,
      { value: tile },
      initialGameState
    );
    expect(allowedMove).toBeTruthy();
  });

  it("should, after first move, allow it if symbol is the same", () => {
    const initialGameState: GameState = {
      currentPlayer: WHITE_PLAYER,
      isRunning: true,
      winner: null,
      turnNumber: 1,
      message: "",
    };
    const tile: Tile = { symbol: "D", color: "red" };
    const { gameState, allowedMove } = checkUserMove(
      mockBoard,
      { value: tile },
      initialGameState
    );
    expect(allowedMove).toBeTruthy();
  });

  it("should, after first move, allow it if color is the same ", () => {
    const initialGameState: GameState = {
      currentPlayer: WHITE_PLAYER,
      isRunning: true,
      winner: null,
      turnNumber: 1,
      message: "",
    };
    const tile: Tile = { symbol: "A", color: "cyan" };
    const { gameState, allowedMove } = checkUserMove(
      mockBoard,
      { value: tile },
      initialGameState
    );
    expect(allowedMove).toBeTruthy();
  });

  it("should, after first move, unallow it if both color and symbol are different from lastPlayed", () => {
    const initialGameState: GameState = {
      currentPlayer: WHITE_PLAYER,
      isRunning: true,
      winner: null,
      turnNumber: 1,
      message: "",
    };
    const tile: Tile = { symbol: "E", color: "green" };
    const { gameState, allowedMove } = checkUserMove(
      mockBoard,
      { value: tile },
      initialGameState
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
