import prompts from "prompts";
import { Tile } from "@kamon/core/src/tile/tile";
import { generatePromptChoices } from "./choices";
import { Board } from "@kamon/core/src/board/board";
import { GameState } from "@kamon/core/src/game/state";

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
