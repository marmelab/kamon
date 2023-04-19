import { Board, renderGame } from "./board/board";
import { initCLI } from "./cli";
import { loadGameConfigFromFile } from "./gameLoader";

initCLI();

const gameConfig: Board = loadGameConfigFromFile();

renderGame({ board: gameConfig, turnNumber: 1 });
