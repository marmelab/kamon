import chalk from "chalk";

export const colors = [
  "yellow",
  "blue",
  "red",
  "green",
  "cyan",
  "white",
  "grey",
] as const;
export const symbols = ["A", "B", "C", "D", "E", "F", "O"] as const;

export type Color = (typeof colors)[number];
export type Symbol = (typeof symbols)[number];

export type Tile = PlayableTile | NeutralTile;
type Player = "black" | "white";
type Styles = "unallowed" | "allowed";

export interface PlayableTile {
  color: Color;
  symbol: Symbol;
  style?: Styles;
  playedBy?: Players;
  lastPlayed?: boolean;
}
type Players = "black" | "white";

interface NeutralTile {
  color: "grey";
  symbol: "O";
  style?: Styles;
  playedBy?: Players;
  lastPlayed?: boolean;
}

export const getAllSymbols = (): Tile[] => {
  const tiles = symbols.map((symbol) =>
    colors.map(
      (color) =>
        ({
          symbol,
          color,
        } as Tile)
    )
  );

  const initialValue: Tile[] = [];
  const flattenedTiles = tiles.reduce((accumulator, symbol) => {
    return [...accumulator, ...symbol];
  }, initialValue);

  const neutralTile: NeutralTile = {
    symbol: "O",
    color: "grey",
    playedBy: null,
    lastPlayed: false,
  };
  return [...flattenedTiles, neutralTile];
};

export const renderTile = (tile: Tile): string => {
  let dynamicChalk = chalk[tile.color];

  if (tile.style === "allowed") {
    dynamicChalk = dynamicChalk.bgWhite.dim;
  }

  if (tile.playedBy != null) {
    if (tile.playedBy === "black") {
      dynamicChalk = dynamicChalk.bgWhite.dim;
    }

    if (tile.playedBy === "white") {
      dynamicChalk = dynamicChalk.bgWhite;
    }
  }

  if (tile.lastPlayed === true) {
    dynamicChalk = dynamicChalk.bold.underline;
  }

  return `${dynamicChalk(tile.symbol)} `;
};
