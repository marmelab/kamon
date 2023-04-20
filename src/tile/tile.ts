import chalk from "chalk";
import { Player } from "../player/player";
import { Board } from "../board/board";

export const colors = [
  "yellow",
  "blue",
  "red",
  "green",
  "cyan",
  "magenta",
] as const;
export const symbols = ["A", "B", "C", "D", "E", "F"] as const;

export type Color = (typeof colors)[number];
export type Symbol = (typeof symbols)[number];

export type Tile = PlayableTile | NeutralTile;

export interface PlayableTile {
  color: Color;
  symbol: Symbol;
  playedBy?: Player;
  lastPlayed?: boolean;
}

export const NEUTRALE_TILE = {
  symbol: "O",
  color: "grey",
};

interface NeutralTile {
  color: "grey";
  symbol: "O";
  playedBy?: null;
  lastPlayed?: false;
}

export interface TileCoordinate {
  x: number;
  y: number;
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

  const flattenedTiles = flatternTiles(tiles);

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

  if (tile.playedBy != null) {
    if (tile.playedBy === "black") {
      dynamicChalk = dynamicChalk.bgGray;
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

export const flatternTiles = (tiles: Tile[][]): Tile[] => {
  const initialValue: Tile[] = [];
  return tiles.reduce((accumulator, symbol) => {
    return [...accumulator, ...symbol];
  }, initialValue);
};

export const playTile = (tile: PlayableTile, player: Player): PlayableTile => {
  return { ...tile, playedBy: player, lastPlayed: true };
};

export const findTile = (board: Board, toFind: Tile): TileCoordinate => {
  let x: number = null;
  let y: number = null;

  board.forEach((line, l) => {
    line.forEach((tile, t) => {
      if (
        tile != undefined &&
        tile.symbol === toFind.symbol &&
        tile.color === toFind.color
      ) {
        y = t;
        x = l;
      }
    });
  });

  return { x, y };
};

export const removeLastPlayed = (tile: PlayableTile): PlayableTile => {
  return { ...tile, lastPlayed: false };
};

export const findLastPLayed = (board: Board): TileCoordinate => {
  let x: number = null;
  let y: number = null;

  board.forEach((line, l) => {
    line.forEach((tile, t) => {
      if (tile != undefined && tile.lastPlayed === true) {
        y = t;
        x = l;
      }
    });
  });

  return { x, y };
};

export const findTileByCoordinate = (
  board: Board,
  coords: TileCoordinate
): PlayableTile => board[coords.x][coords.y] as PlayableTile;
