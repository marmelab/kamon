import exp from "constants";
import { Board } from "../board/board";
import { initGameState } from "../game/state";
import { initRandomGame } from "../randomizer/randomizer";
import { checkUserMove } from "./move";
import { GameState } from "../game/state";
import { Tile } from "../tile/tile";
import { BLACK_PLAYER, WHITE_PLAYER } from "../player/player";

const mockBoard: Board = [
  [
    undefined,
    undefined,
    undefined,
    { symbol: "A", color: "green" },
    { symbol: "B", color: "blue" },
    { symbol: "A", color: "cyan" },
    { symbol: "B", color: "magenta" },
    undefined,
    undefined,
    undefined,
  ],
  [
    undefined,
    undefined,
    { symbol: "C", color: "cyan" },
    { symbol: "C", color: "magenta" },
    { symbol: "C", color: "blue" },
    { symbol: "F", color: "magenta" },
    { symbol: "C", color: "green" },
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
    { symbol: "F", color: "green" },
    { symbol: "C", color: "red" },
    { symbol: "B", color: "red" },
    { symbol: "F", color: "cyan" },
    { symbol: "E", color: "magenta" },
    { symbol: "F", color: "red" },
    { symbol: "D", color: "red" },
  ],
  [
    undefined,
    { symbol: "B", color: "green" },
    { symbol: "D", color: "magenta" },
    { symbol: "A", color: "yellow" },
    { symbol: "A", color: "blue" },
    { symbol: "D", color: "yellow" },
    { symbol: "C", color: "yellow" },
    undefined,
  ],
  [
    undefined,
    undefined,
    { symbol: "E", color: "red" },
    { symbol: "A", color: "red" },
    { symbol: "B", color: "cyan", playedBy: "white", lastPlayed: true },
    { symbol: "O", color: "grey", playedBy: null, lastPlayed: false },
    { symbol: "E", color: "green" },
    undefined,
    undefined,
  ],
  [
    undefined,
    undefined,
    undefined,
    { symbol: "A", color: "magenta" },
    { symbol: "D", color: "blue" },
    { symbol: "D", color: "cyan" },
    { symbol: "E", color: "yellow" },
    undefined,
    undefined,
    undefined,
  ],
];

describe("checkUserMove", () => {
  it("should, on first move, unallow to play first tile", () => {
    const initialGameState: GameState = initGameState();
    const tile: Tile = { symbol: "A", color: "green" };
    const { gameState, allowedMove } = checkUserMove(
      mockBoard,
      { value: tile },
      initialGameState
    );
    expect(allowedMove).toBeFalsy();
  });

  it("should, on first move, allow to play second tile", () => {
    const initialGameState: GameState = initGameState();
    const tile: Tile = { symbol: "B", color: "blue" };
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
      isDraw: false,
      message: "",
    };
    const tile: Tile = { symbol: "B", color: "magenta" };
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
      isDraw: false,
      message: "",
    };
    const tile: Tile = { symbol: "C", color: "cyan" };
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
      isDraw: false,
      message: "",
    };
    const tile: Tile = { symbol: "E", color: "red" };
    const { gameState, allowedMove } = checkUserMove(
      mockBoard,
      { value: tile },
      initialGameState
    );
    expect(allowedMove).toBeFalsy();
  });
});
