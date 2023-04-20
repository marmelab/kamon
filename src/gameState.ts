import { Board } from "./board/board";
import { loadGameConfigFromFile } from "./gameLoader";
import { Coordinates, checkIfMoveIsAllowed } from "./move/move";
import { Player } from "./player";
import { Tile } from "./tile/tile";

const initialGameState: GameState = {
  currentPlayer: "black",
  turnNumber: 1,
};

export interface GameState {
  board?: Board;
  turnNumber: number;
  currentPlayer: Player;
  winner?: Player;
  selectedMoveCordinates?: Coordinates;
}
export type GameActionName =
  | "SELECT_TILE"
  | "FORFEIT"
  | "WAITING"
  | "END_TURN"
  | "LOAD_BOARD";
export interface GameStateAction {
  name: GameActionName;
  selectedMoveCoordinates?: Coordinates;
  newBoard?: Board;
}

const setAllowedTilesOnBoard = (gameState: GameState): Board => {
  if (gameState.board == null) {
    return null;
  }

  if (gameState.turnNumber === 1) {
    let newBoard: Board = JSON.parse(JSON.stringify(gameState.board));
    gameState.board.forEach((line, y) =>
      line.forEach((tile, x) => {
        const currentTile = newBoard[y][x];

        if (currentTile == null) {
          return;
        }

        newBoard[y][x].moveAllowed = checkIfMoveIsAllowed(
          { x, y },
          gameState.turnNumber === 1
        );
      })
    );
    return newBoard;
  }
};

export const computeGameState = (
  gameState: GameState | undefined,
  action: GameStateAction
): GameState => {
  if (action.name === "SELECT_TILE") {
    const isMoveAllowed = checkIfMoveIsAllowed(
      gameState.selectedMoveCordinates,
      gameState.turnNumber === 1
    );

    if (isMoveAllowed) {
      return {
        ...gameState,
        selectedMoveCordinates: action.selectedMoveCoordinates,
      };
    }
  }

  if (action.name === "LOAD_BOARD") {
    const board: Board = loadGameConfigFromFile();
    const newGameState = { ...initialGameState, board: board };

    return { ...newGameState, board: setAllowedTilesOnBoard(newGameState) };
  }

  return gameState;
};
