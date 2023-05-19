import { Board, updateBoardState } from "../board";
import { GameState } from "../game";
import { getOppositePath, updateGraphState } from "../graph";
import { Player } from "../player";
import {
  PlayableTile,
  Tile,
  findTile,
  findTileByCoordinate,
  playTile,
} from "../tile";

export const getMissingTilesForPath = (player: Player, board: Board) => {
  const tiles: Tile[] = [];

  board.forEach((line) => {
    line.forEach((tile: PlayableTile, i) => {
      if (!tile) return;
      let updatedBoard = JSON.parse(JSON.stringify(board));
      const { x: lineIndex, y: tileIndex } = findTile(updatedBoard, tile);
      const playedTile = playTile(
        findTileByCoordinate(updatedBoard, { x: lineIndex, y: tileIndex }),
        player,
      );

      updatedBoard[lineIndex][tileIndex] = playedTile;
      const graph = updateGraphState(player, updatedBoard);
      if (getOppositePath(graph).length > 0) {
        tiles.push(tile);
      }
    });
  });

  return tiles;
};
