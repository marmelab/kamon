import prompts from "prompts";
import { Tile, Board, GameState } from "@kamon/core";
import { generatePromptChoices } from "./choices";

export const prompt = async (gameState: GameState, board: Board) => {
  const choices = generatePromptChoices(board);
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
