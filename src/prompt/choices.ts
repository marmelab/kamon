import { Board } from "../board/board";
import { NEUTRALE_TILE, Tile, flatternTiles } from "../tile/tile";

export const generatePromptChoices = (board: Board) => {
  const choices = flatternTiles(board).reduce((acc, tile: Tile) => {
    if (tile != undefined && tile.symbol !== NEUTRALE_TILE.symbol) {
      if (tile.moveAllowed === false) {
        return acc;
      }
      acc.push({
        title: `${tile.color} ${tile.symbol}`,
        value: tile,
      });
    }

    return acc;
  }, []);

  choices.push({ title: "Quit", value: "q" });
  choices.push({ title: "Save", value: "s" });

  return choices;
};
