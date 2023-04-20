import prompts from "prompts";
import { Tile } from "../tile/tile";
import { generateChoices } from "./choices";
import { Board } from "../board/board";
import { GameState } from "../game/state";

export interface UserInput {
  value: any;
}

export const prompt = async (gameState: GameState, board: Board) => {
  const choices = generateChoices(board);
  choices.push({ title: "Quit", value: "q" });
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
