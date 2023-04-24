import prompts from "prompts";
import { Tile } from "../tile/tile";
import { generatePromptChoices } from "./choices";
import { Board } from "../board/board";
import { GameState } from "../game/state";

export const prompt = async (gameState: GameState, board: Board) => {
  const choices = generatePromptChoices(board);
  choices.push({ title: "Quit", value: "q" });
  choices.push({ title: "Log", value: "log" });
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
