import { Board, findTile, renderBoard } from "./board/board";
import { initCLI } from "./cli";
import { loadGameConfigFromFile } from "./gameLoader";
import { askToPlay } from "./prompt/prompt";
import { generateChoices } from "./prompt/choices";
import { WHITE_PLAYER, switchPlayer } from "./player/player";

initCLI();
const gameConfig: Board = loadGameConfigFromFile();

let player = WHITE_PLAYER;

let isTheGameRunning = false;

const renderGame = async (gameConfig: Board, message: string) => {
  isTheGameRunning = true;
  renderBoard(gameConfig);
  const choices = generateChoices(gameConfig);

  choices.push({ title: "Quit", value: "q" });

  const userInput = await askToPlay(choices, message);

  if (userInput.value === "q") {
    isTheGameRunning = false;
    return;
  }

  if (userInput.value == undefined) {
    renderGame(
      gameConfig,
      `Oops, this value does not exit in the board 😆 ! Please player ${player} choose an existing tile`
    );
    return;
  }
  player = switchPlayer(player);
  console.log(findTile(gameConfig, userInput.value));
};

(async () => {
  do {
    await renderGame(gameConfig, `Player ${player}, where do you wanna play ?`);
  } while (isTheGameRunning);
})();
