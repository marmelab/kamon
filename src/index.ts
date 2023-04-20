import { Board, renderBoard } from "./board/board";
import { initCLI } from "./cli";
import { loadGameConfigFromFile } from "./gameLoader";
import { askToPlay } from "./prompt/prompt";
import { generateChoices } from "./prompt/choices";
import { BLACK_PLAYER, switchPlayer } from "./player/player";
import {
  NEUTRALE_TILE,
  findTileByCoordinate,
  findTile,
  playTile,
  findLastPLayed,
  removeLastPlayed,
  PlayableTile,
} from "./tile/tile";

initCLI();
const gameConfig: Board = loadGameConfigFromFile();

let gameState = {
  player: BLACK_PLAYER,
  isRunning: false,
  message: "Welcome to Kamon 🍱 ! Black player, you turn",
};

interface Action {
  value: any;
}

const updateBoardState = (board: Board, action: Action): Board => {
  const { lineIndex: lastPlayedLineIndex, tileIndex: lastPlayedTileIndex } =
    findLastPLayed(board);

  if (lastPlayedLineIndex != undefined && lastPlayedTileIndex != undefined) {
    board[lastPlayedLineIndex][lastPlayedTileIndex] = removeLastPlayed(
      board[lastPlayedLineIndex][lastPlayedTileIndex] as PlayableTile
    );
  }

  const { lineIndex, tileIndex } = findTile(board, action.value);
  const tile = playTile(
    findTileByCoordinate(board, { lineIndex, tileIndex }),
    gameState.player
  );

  board[lineIndex][tileIndex] = tile;

  return [...board];
};

const prompt = async (message) => {
  const choices = generateChoices(gameConfig);
  choices.push({ title: "Quit", value: "q" });
  return await askToPlay(choices, message);
};

const checkUserMove = (action: Action) => {
  if (action.value === "q") {
    gameState = { ...gameState, isRunning: false };
    return false;
  }

  if (action.value == undefined) {
    gameState = {
      ...gameState,
      message: `Oops, this tile does not exit in the board 😆 ! Please player ${gameState.player.toUpperCase()} choose an existing tile`,
    };
    return false;
  }

  const { lineIndex, tileIndex } = findTile(gameConfig, action.value);
  const playedTile = findTileByCoordinate(gameConfig, { lineIndex, tileIndex });

  if (playedTile.playedBy) {
    gameState = {
      ...gameState,
      message: `Hey budy, are you trying to play on an played tile ?! 🤔 Please player ${gameState.player.toUpperCase()} choose an non played tile`,
    };
    return false;
  }

  if (playedTile.symbol === NEUTRALE_TILE.symbol) {
    gameState = {
      ...gameState,
      message: `🫠 TameState.isRunninghis tile is not playable. Please player ${gameState.player.toUpperCase()} choose a playable tile`,
    };
    return false;
  }

  return true;
};

renderBoard(gameConfig);
gameState = { ...gameState, isRunning: true };

(async () => {
  while (gameState.isRunning) {
    const action = await prompt(gameState.message);
    const userCanMove = checkUserMove(action);
    if (!userCanMove) continue;

    const updatedBoard = updateBoardState(gameConfig, action);
    renderBoard(updatedBoard);
    gameState = {
      ...gameState,
      player: switchPlayer(gameState.player),
      message: `${switchPlayer(gameState.player).toUpperCase()}, you turn`,
    };
  }
})();
