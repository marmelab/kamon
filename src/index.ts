import { Board, renderBoard } from "./board/board";
import { initCLI } from "./cli";
import { loadGameConfigFromFile } from "./gameLoader";

initCLI();

const gameConfig: Board = loadGameConfigFromFile();

renderBoard(gameConfig);
