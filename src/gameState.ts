import { Board } from "./board/board";

export interface GameState {
  board: Board;
  turnNumber: number;
}
