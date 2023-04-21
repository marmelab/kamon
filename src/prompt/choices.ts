import { NEUTRALE_TILE, Tile, flatternTiles } from "../tile/tile";

export const generateChoices = (gameConfig) => {
  const choices = flatternTiles(gameConfig).reduce((acc, tile: Tile) => {
    if (tile != undefined && tile.symbol !== NEUTRALE_TILE.symbol) {
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
