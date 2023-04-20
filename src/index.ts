import { Board, renderBoard } from "./board/board";
import { initCLI } from "./cli";
import { loadGameConfigFromFile } from "./gameLoader";
import { computeGameState } from "./gameState";

initCLI();
const gameState = computeGameState(undefined, { name: "LOAD_BOARD" });
renderBoard(gameState.board);
