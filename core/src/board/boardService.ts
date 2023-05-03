import { Board } from "./boardType";
import { NullableTile, Tile } from "../tile";

export const getLastPlayedTile = (board: Board): NullableTile => {
  let lastPlayedTile: NullableTile;

  board.forEach((line) => {
    if (lastPlayedTile != undefined) {
      return;
    }
    line.forEach((tile: Tile) => {
      if (lastPlayedTile != undefined || tile == undefined) {
        return;
      }
      if (tile.lastPlayed) {
        lastPlayedTile = tile;
      }
    });
  });

  return lastPlayedTile;
};
