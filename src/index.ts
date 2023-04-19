import { Board, renderBoard } from "./board/board";
import { initCLI } from "./cli";
import { loadGameConfigFromFile } from "./gameLoader";
import { initRandomGame } from "./randomizer/randomizer";

initCLI();
const gameConfig: Board = loadGameConfigFromFile();

renderBoard(gameConfig);
