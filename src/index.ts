import { Board, renderBoard } from "./board/board";
import { initCLI } from "./cli";
import { loadGameConfigFromFile } from "./gameLoader";
import prompts from "prompts";
import { Tile, flatternTiles } from "./tile/tile";

initCLI();
const gameConfig: Board = loadGameConfigFromFile();
renderBoard(gameConfig);

(async () => {
  const choices = flatternTiles(gameConfig).reduce((acc, tile: Tile) => {
    if (tile != undefined && tile.symbol !== "O") {
      acc.push({
        title: `${tile.color} ${tile.symbol}`,
        value: tile,
      });
    }

    return acc;
  }, []);

  const response = await prompts({
    type: "autocomplete",
    name: "value",
    message: `Player, where do you wanna play ?`,
    choices,
  });

  let token: Tile = null;
  gameConfig.forEach((line, i) => {
    if (token != undefined) {
      return;
    }

    token = line.find((tile: any) => {
      if (tile != undefined)
        return (
          tile.symbol === response.value.symbol &&
          tile.color === response.value.color
        );
    });
  });

  console.log(token);
})();
