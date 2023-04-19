import chalk from "chalk";

type Color = "yellow" | "blue" | "red" | "green" | "cyan" | "white";
type Symbol = "A" | "B" | "C" | "D" | "E" | "F";
type Styles = "unallowed" | "allowed";

export interface Tile {
  color: Color;
  symbol: Symbol;
  style?: Styles;
}

export const renderTile = (tile: Tile): string => {
  let dynamicChalk = chalk[tile.color];

  if (tile.style === "allowed") {
    dynamicChalk = dynamicChalk.bgWhite.dim;
  }

  return dynamicChalk(tile.symbol);
};
