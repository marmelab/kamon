import { initGameState } from "../game/state";
import { checkUserMove } from "./move";
import { GameState } from "../game/state";
import { Tile } from "../tile/tile";
import { WHITE_PLAYER } from "../player/player";
import { getMock } from "../mocks/getMock";

const mockBoard = getMock("boards/oneTile.json");

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
