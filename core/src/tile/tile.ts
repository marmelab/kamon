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
  moveAllowed?: boolean;
  highlighted?: boolean;
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
  moveAllowed?: boolean;
  highlighted?: boolean;
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
        } as Tile),
    ),
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
      if (tile?.symbol == toFind.symbol && tile?.color === toFind.color) {
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
      if (tile?.lastPlayed) {
        y = t;
        x = l;
      }
    });
  });

  return { x, y };
};

export const findTileByCoordinate = (
  board: Board,
  coords: TileCoordinate,
): PlayableTile => board[coords.x][coords.y] as PlayableTile;

export const getTileName = (tile: PlayableTile): string =>
  `${tile.symbol}-${tile.color}`;

export const findLastPlayableTile = (
  line: Tile[],
): PlayableTile | undefined => {
  return line[6] as PlayableTile;
};

export const findFirstPlayableTile = (line: Tile[]): Tile | undefined => {
  const playable = line.find((tile) => tile != undefined);
  return playable as PlayableTile | undefined;
};

export const checkIfCoordsExist = (board: Board, coords: TileCoordinate) =>
  board[coords.x] &&
  board[coords.x][coords.y] &&
  board[coords.x][coords.y].symbol
    ? true
    : false;

interface Siblings {
  topLeft: TileCoordinate | null;
  topRight: TileCoordinate | null;
  next: TileCoordinate | null;
  bottomRight: TileCoordinate | null;
  bottomLeft: TileCoordinate | null;
  previous: TileCoordinate | null;
}

const MIDDLE_LINE_X_VALUE = 3;

export const findSiblings = (
  board: Board,
  tileCoords: TileCoordinate,
  player?: Player,
): Siblings => {
  const siblingsCoords = {
    topLeft: {
      x: tileCoords.x - 1,
      y: tileCoords.x <= MIDDLE_LINE_X_VALUE ? tileCoords.y : tileCoords.y - 1,
    },
    topRight: {
      x: tileCoords.x - 1,
      y: tileCoords.x <= MIDDLE_LINE_X_VALUE ? tileCoords.y + 1 : tileCoords.y,
    },
    next: {
      x: tileCoords.x,
      y: tileCoords.y + 1,
    },
    bottomRight: {
      x: tileCoords.x + 1,
      y: tileCoords.x >= MIDDLE_LINE_X_VALUE ? tileCoords.y + 1 : tileCoords.y,
    },
    bottomLeft: {
      x: tileCoords.x + 1,
      y: tileCoords.x >= MIDDLE_LINE_X_VALUE ? tileCoords.y : tileCoords.y - 1,
    },
    previous: {
      x: tileCoords.x,
      y: tileCoords.y - 1,
    },
  };

  let coords: Siblings = {
    topLeft: null,
    topRight: null,
    next: null,
    bottomRight: null,
    bottomLeft: null,
    previous: null,
  };

  if (player && board[tileCoords.x][tileCoords.y].playedBy !== player) {
    return coords;
  }

  for (const key in siblingsCoords) {
    const coordsToFind = siblingsCoords[key];
    const tileExist = checkIfCoordsExist(board, coordsToFind);

    if (!tileExist) continue;

    if (
      tileExist &&
      player &&
      player !== board[coordsToFind.x][coordsToFind.y].playedBy
    )
      continue;

    coords[key] = board[coordsToFind.x][coordsToFind.y];
  }

  return coords;
};
