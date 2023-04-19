import { Board, renderBoard } from "./board/board";
import { initCLI } from "./cli";
import { loadGameConfigFromFile } from "./gameLoader";

initCLI();

export let gameConfig: Board = loadGameConfigFromFile();
console.log(gameConfig);
renderBoard(gameConfig);
