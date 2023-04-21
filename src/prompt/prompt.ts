import prompts from "prompts";
import { Tile } from "../tile/tile";
import { generateChoices } from "./choices";
import { Board } from "../board/board";
import { GameState } from "../game/state";

export const prompt = async (gameState: GameState, board: Board) => {
  const choices = generateChoices(board);
  return await askToPlay(choices, gameState.message);
};

const askToPlay = async (choices: Tile[], message: string) => {
  return prompts({
    type: "autocomplete",
    name: "value",
    message: message,
    choices,
  });
};
