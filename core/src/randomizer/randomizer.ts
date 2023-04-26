import { Board } from "../board/board";
import { getAllSymbols } from "../tile/tile";

export const createNullableTiles = (number: number): undefined[] => {
  const tiles = [];
  for (let index = 0; index < number; index++) {
    tiles.push(null);
  }
  return tiles;
};

export const initRandomGame = (): Board => {
  const randomSymbolCollection = getAllSymbols().sort(
    () => Math.random() - 0.5,
  );

  return [
    [
      ...createNullableTiles(3),
      ...randomSymbolCollection.slice(0, 4),
      ...createNullableTiles(3),
    ],
    [
      ...createNullableTiles(2),
      ...randomSymbolCollection.slice(4, 9),
      ...createNullableTiles(2),
    ],
    [
      ...createNullableTiles(1),
      ...randomSymbolCollection.slice(9, 15),
      ...createNullableTiles(1),
    ],
    [...randomSymbolCollection.slice(15, 22)],
    [...createNullableTiles(1), ...randomSymbolCollection.slice(22, 28)],
    [...createNullableTiles(2), ...randomSymbolCollection.slice(28, 33)],
    [...createNullableTiles(3), ...randomSymbolCollection.slice(33, 37)],
  ];
};
