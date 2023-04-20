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
    { symbol: "E", color: "blue" },
    { symbol: "A", color: "yellow" },
    { symbol: "A", color: "blue" },
    { symbol: "O", color: "blue" },
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
    { symbol: "O", color: "green" },
    undefined,
    undefined,
  ],
  [
    undefined,
    { symbol: "B", color: "yellow" },
    { symbol: "F", color: "yellow" },
    { symbol: "C", color: "red" },
    { symbol: "D", color: "blue" },
    { symbol: "D", color: "green" },
    { symbol: "B", color: "magenta" },
    undefined,
  ],
  [
    { symbol: "D", color: "cyan", playedBy: "black", lastPlayed: true },
    { symbol: "O", color: "grey", playedBy: null, lastPlayed: false },
    { symbol: "C", color: "green" },
    { symbol: "O", color: "cyan" },
    { symbol: "E", color: "yellow" },
    { symbol: "F", color: "blue" },
    { symbol: "B", color: "cyan" },
  ],
  [
    undefined,
    { symbol: "C", color: "magenta" },
    { symbol: "F", color: "cyan" },
    { symbol: "F", color: "magenta" },
    { symbol: "D", color: "magenta" },
    { symbol: "F", color: "red" },
    { symbol: "E", color: "magenta" },
    undefined,
  ],
  [
    undefined,
    undefined,
    { symbol: "O", color: "yellow" },
    { symbol: "E", color: "green" },
    { symbol: "C", color: "cyan" },
    { symbol: "D", color: "yellow" },
    { symbol: "E", color: "red" },
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
    { symbol: "O", color: "red" },
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
    const tile: Tile = { symbol: "D", color: "magenta" };
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
