import { Board, renderBoard } from "./board/board";
import { initCLI } from "./cli";
import { loadGameConfigFromFile } from "./gameLoader";
import { askToPlay } from "./prompt/prompt";
import { generateChoices } from "./prompt/choices";
import { BLACK_PLAYER, WHITE_PLAYER, switchPlayer } from "./player/player";
import {
  NEUTRALE_TILE,
  findTileByCoordinate,
  findTileInBoard,
  playTile,
} from "./tile/tile";

initCLI();
const gameConfig: Board = loadGameConfigFromFile();

const gameState = {
  player: BLACK_PLAYER,
  isTheGameRunning: false,
  message: "Welcome to Kamon 🍱 ! Black player, you turn",
};

const renderGame = async (gameConfig: Board, message: string) => {
  gameState.isTheGameRunning = true;
  renderBoard(gameConfig);
  const choices = generateChoices(gameConfig);

  choices.push({ title: "Quit", value: "q" });

  const userInput = await askToPlay(choices, message);

  if (userInput.value === "q") {
    gameState.isTheGameRunning = false;
    return;
  }

  if (userInput.value == undefined) {
    gameState.message = `Oops, this tile does not exit in the board 😆 ! Please player ${gameState.player.toUpperCase()} choose an existing tile`;
    return;
  }

  const { lineIndex, tileIndex } = findTileInBoard(gameConfig, userInput.value);

  if (findTileByCoordinate(gameConfig, { lineIndex, tileIndex }).playedBy) {
    gameState.message = `Hey budy, are you trying to play on an played tile ?! 🤔 Please player ${gameState.player.toUpperCase()} choose an non played tile`;
    return;
  }

  if (
    findTileByCoordinate(gameConfig, { lineIndex, tileIndex }).symbol ===
    NEUTRALE_TILE.symbol
  ) {
    gameState.message = `🫠 This tile is note playable. Please player ${gameState.player.toUpperCase()} choose a playable tile`;
    return;
  }

  //🫠
  const tile = playTile(
    findTileByCoordinate(gameConfig, { lineIndex, tileIndex }),
    gameState.player
  );

  gameConfig[lineIndex][tileIndex] = tile;
  gameState.player = switchPlayer(gameState.player);
  gameState.message = `${gameState.player.toUpperCase()} player, your move 🙂`;
};

(async () => {
  do {
    await renderGame(gameConfig, gameState.message);
  } while (gameState.isTheGameRunning);
})();
