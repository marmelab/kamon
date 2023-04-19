import { Board } from "../board/board";
import prompts from "prompts";
import { Tile, flatternTiles } from "../tile/tile";

export const askToPlay = async (gameConfig: Board) => {
  const choices = flatternTiles(gameConfig).reduce((acc, tile: Tile) => {
    if (tile != undefined && tile.symbol !== "O") {
      acc.push({
        title: `${tile.color} ${tile.symbol}`,
        value: tile,
      });
    }

    return acc;
  }, []);

  return prompts({
    type: "autocomplete",
    name: "value",
    message: `Player, where do you wanna play ?`,
    choices,
  });
};
