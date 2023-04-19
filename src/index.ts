import { Board, findTile, renderBoard } from "./board/board";
import { initCLI } from "./cli";
import { loadGameConfigFromFile } from "./gameLoader";
import { askToPlay } from "./prompt/prompt";
import { generateChoices } from "./prompt/choices";

initCLI();
const gameConfig: Board = loadGameConfigFromFile();

let player = 1;
const switchPlayer = () => {
  if (player === 1) player = 2;
  else player = 1;
};

const renderGame = async (gameConfig: Board, message: string) => {
  renderBoard(gameConfig);
  const choices = generateChoices(gameConfig);
  const userInput = await askToPlay(choices, message);
  if (userInput.value == undefined) {
    renderGame(
      gameConfig,
      `Oops, this value does not exit in the board 😆 ! Please player ${player} choose an existing tile`
    );
    return;
  }
  switchPlayer();
  console.log(findTile(gameConfig, userInput.value));
};

renderGame(gameConfig, `Player ${player}, where do you wanna play ?`);
