import { Board, renderBoard } from "./board/board";
import { initCLI } from "./cli";
import { loadGameConfigFromFile } from "./gameLoader";
import { initRandomGame } from "./randomizer/randomizer";

//renderBoard(initNewGame());

initCLI();
const gameConfig: Board = loadGameConfigFromFile();

renderBoard(gameConfig);
