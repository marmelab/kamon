import chalk from "chalk";
import {
  Board,
  getLastPlayedTile,
  NEUTRALE_TILE,
  Tile,
  flatternTiles,
  getPlayableTilesForNextMove,
} from "@kamon/core";

export const generatePromptChoices = (board: Board) => {
  const lastPlayedTile = getLastPlayedTile(board);

  const playableTiles = getPlayableTilesForNextMove(board, lastPlayedTile);

  const choices = flatternTiles(board).reduce((acc, tile: Tile) => {
    if (tile != undefined && tile.symbol !== NEUTRALE_TILE.symbol) {
      if (playableTiles.length > 0 && !playableTiles.includes(tile)) {
        return acc;
      }

      const inputText = `${tile.color} ${tile.symbol}`;
      acc.push({
        title: `${chalk[tile.color](inputText)}`,
        value: tile,
      });
    }

    return acc;
  }, []);

  choices.push({ title: "Quit", value: "q" });
  choices.push({ title: "Save", value: "s" });
  choices.push({ title: "Log", value: "log" });

  return choices;
};
