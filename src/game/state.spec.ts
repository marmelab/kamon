import { Board, getLastPlayedTile } from "../board/board";
import { getPlayableTilesForNextMove } from "../move/move";
import { initGameState, winGame, checkIfGameWon } from "./state";

const mockFilledBoard: Board = [
  [
    undefined,
    undefined,
    undefined,
    { symbol: "E", color: "blue", playedBy: "black" },
    { symbol: "A", color: "yellow", playedBy: "black" },
    { symbol: "A", color: "blue", playedBy: "black" },
    { symbol: "C", color: "blue", playedBy: "black" },
    undefined,
    undefined,
    undefined,
  ],
  [
    undefined,
    undefined,
    { symbol: "A", color: "magenta", playedBy: "black" },
    { symbol: "A", color: "cyan", playedBy: "black" },
    { symbol: "A", color: "green", playedBy: "black" },
    { symbol: "D", color: "red", playedBy: "black" },
    { symbol: "A", color: "green", playedBy: "black" },
    undefined,
    undefined,
  ],
  [
    undefined,
    { symbol: "E", color: "cyan", playedBy: "black" },
    { symbol: "B", color: "yellow", playedBy: "black" },
    { symbol: "E", color: "blue", playedBy: "black" },
    { symbol: "D", color: "green", playedBy: "black" },
    { symbol: "F", color: "blue", playedBy: "black" },
    { symbol: "F", color: "yellow", playedBy: "black" },
    undefined,
  ],
  [
    { symbol: "D", color: "cyan", playedBy: "black", lastPlayed: true },
    { symbol: "O", color: "grey", playedBy: null, lastPlayed: false },
    { symbol: "C", color: "green", playedBy: "black" },
    { symbol: "C", color: "cyan", playedBy: "black" },
    { symbol: "E", color: "yellow", playedBy: "black" },
    { symbol: "F", color: "blue", playedBy: "black" },
    { symbol: "B", color: "cyan", playedBy: "black" },
  ],
  [
    undefined,
    { symbol: "B", color: "green", playedBy: "black" },
    { symbol: "D", color: "magenta", playedBy: "black" },
    { symbol: "A", color: "green", playedBy: "black" },
    { symbol: "A", color: "blue", playedBy: "black" },
    { symbol: "D", color: "yellow", playedBy: "black" },
    { symbol: "C", color: "yellow", playedBy: "black" },
    undefined,
  ],
  [
    undefined,
    undefined,
    { symbol: "B", color: "yellow", playedBy: "black" },
    { symbol: "E", color: "green", playedBy: "black" },
    undefined,
    undefined,
  ],
  [
    undefined,
    undefined,
    undefined,
    { symbol: "B", color: "green", playedBy: "black" },
    { symbol: "A", color: "red", playedBy: "black" },
    { symbol: "F", color: "green", playedBy: "black" },
    { symbol: "A", color: "red", playedBy: "black" },
    undefined,
    undefined,
    undefined,
  ],
];

describe("winGame", () => {
  it("should set player as winner", () => {
    expect(winGame("black", initGameState()).winner).toBe("black");
  });

  it("should stop game", () => {
    expect(winGame("black", initGameState()).isRunning).toBeFalsy();
  });
});

describe("checkIfGameIsWon", () => {
  it("should win game when there is no remaining move", () => {
    const possibleMoves = getPlayableTilesForNextMove(
      mockFilledBoard,
      getLastPlayedTile(mockFilledBoard)
    );
    expect(checkIfGameWon(initGameState(), possibleMoves)).toBeTruthy();
  });

  it("shouldn't win game when there is a possible", () => {
    let boardWithPossibleMove = JSON.parse(JSON.stringify(mockFilledBoard));
    const lastPlayedTile = getLastPlayedTile(mockFilledBoard);

    boardWithPossibleMove[0][4] = { symbol: "D", color: "blue" };

    const possibleMoves = getPlayableTilesForNextMove(
      boardWithPossibleMove,
      lastPlayedTile
    );

    expect(checkIfGameWon(initGameState(), possibleMoves)).toBeFalsy();
  });
});
