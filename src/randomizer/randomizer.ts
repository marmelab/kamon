import { Board } from "../board/board";
import { getSymbolCollection } from "../tile/tile";

export const createUndefinedTiles = (number: number): undefined[] => {
  const tiles = [];
  for (let index = 0; index < number; index++) {
    tiles.push(undefined);
  }
  return tiles;
};

export const initNewGame = (): Board => {
  const randomSymbolCollection = getSymbolCollection().sort(
    () => Math.random() - 0.5
  );

  return [
    [
      ...createUndefinedTiles(3),
      ...randomSymbolCollection.slice(0, 4),
      ...createUndefinedTiles(3),
    ],
    [
      ...createUndefinedTiles(2),
      ...randomSymbolCollection.slice(4, 9),
      ...createUndefinedTiles(2),
    ],
    [
      ...createUndefinedTiles(1),
      ...randomSymbolCollection.slice(9, 15),
      ...createUndefinedTiles(1),
    ],
    [...randomSymbolCollection.slice(15, 22)],
    [
      ...createUndefinedTiles(1),
      ...randomSymbolCollection.slice(22, 28),
      ...createUndefinedTiles(1),
    ],
    [
      ...createUndefinedTiles(2),
      ...randomSymbolCollection.slice(28, 33),
      ...createUndefinedTiles(2),
    ],
    [
      ...createUndefinedTiles(3),
      ...randomSymbolCollection.slice(33, 37),
      ...createUndefinedTiles(3),
    ],
  ];
};
