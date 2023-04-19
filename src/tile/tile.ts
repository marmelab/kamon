import chalk from "chalk";

export const colors = [
  "yellow",
  "blue",
  "red",
  "green",
  "cyan",
  "white",
] as const;
export const symbols = ["A", "B", "C", "D", "E", "F"] as const;

export type Color = (typeof colors)[number];
export type Symbol = (typeof symbols)[number];

export type Tile = PlayableTile | NeutralTile;
type Styles = "unallowed" | "allowed";
type Player = "black" | "white";

export interface PlayableTile {
  color: Color;
  symbol: Symbol;
  playedBy?: Player;
  lastPlayed?: boolean;
  style?: Styles;
}

interface NeutralTile {
  color: "grey";
  symbol: "O";
  playedBy?: null;
  lastPlayed?: false;
  style?: Styles;
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
