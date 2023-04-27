import chalk from "chalk";
import { Tile } from "@kamon/core";

export const renderTile = (tile: Tile): string => {
  let dynamicChalk = chalk[tile.color];

  if (tile.moveAllowed === true) {
    dynamicChalk = dynamicChalk.bold;
  }

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
