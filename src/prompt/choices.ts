import { NEUTRALE_TILE, Tile, flatternTiles } from "../tile/tile";

export const generateChoices = (gameConfig) =>
  flatternTiles(gameConfig).reduce((acc, tile: Tile) => {
    if (tile != undefined && tile.symbol !== NEUTRALE_TILE.symbol) {
      acc.push({
        title: `${tile.color} ${tile.symbol}`,
        value: tile,
      });
    }

    return acc;
  }, []);
