import chalk from "chalk";
import { Board, getLastPlayedTile } from "../board/board";
import { NEUTRALE_TILE, Tile, flatternTiles } from "../tile/tile";
import { getPlayableTilesForNextMove } from "../move/move";

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

  return choices;
};
