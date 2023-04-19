import { Tile, flatternTiles } from "../tile/tile";

export const generateChoices = (gameConfig): Tile[] =>
  flatternTiles(gameConfig).reduce((acc, tile: Tile) => {
    if (tile != undefined && tile.symbol !== "O") {
      acc.push({
        title: `${tile.color} ${tile.symbol}`,
        value: tile,
      });
    }

    return acc;
  }, []);
