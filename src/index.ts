import { Board, findTile, renderBoard } from "./board/board";
import { initCLI } from "./cli";
import { loadGameConfigFromFile } from "./gameLoader";
import prompts from "prompts";
import { Tile, flatternTiles } from "./tile/tile";
import { askToPlay } from "./prompt/prompt";

initCLI();
const gameConfig: Board = loadGameConfigFromFile();
renderBoard(gameConfig);

(async () => {
  const userInput = await askToPlay(gameConfig);
  findTile(gameConfig, userInput);
})();
