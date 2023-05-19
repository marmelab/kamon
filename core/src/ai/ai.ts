import { Board, clearAllowedTilesHighlight, getLastPlayedTile } from "../board";
import { GameState, checkIfGameWon } from "../game";
import { getOppositePath, updateGraphState } from "../graph";
import { checkUserMove, getPlayableTilesForNextMove } from "../move";
import { Player } from "../player";
import {
  PlayableTile,
  Tile,
  findTile,
  findTileByCoordinate,
  playTile,
} from "../tile";

export const getMissingTilesForPath = (
  player: Player,
  board: Board,
): PlayableTile[] => {
  const tiles: PlayableTile[] = [];

  board.forEach((line) => {
    line.forEach((tile: PlayableTile, i) => {
      if (!tile) return;
      if (tile.playedBy) return;

      const lastPlayedTile = getLastPlayedTile(board);
      if (
        lastPlayedTile.symbol !== tile.symbol &&
        lastPlayedTile.color !== tile.color
      ) {
        return;
      }

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

export const highlightMissingTilesForPath = (
  player: Player,
  board: Board,
): Board => {
  const newBoard = clearAllowedTilesHighlight(board);
  const tiles = getMissingTilesForPath(player, newBoard);
  tiles.forEach((tile) => {
    const { x, y } = findTile(newBoard, tile);
    newBoard[x][y] = { ...tile, moveAllowed: true };
  });

  return newBoard;
};

export const getBlockedTiles = (player: Player, board: Board) => {
  const lastPlayedTile = getLastPlayedTile(board);
  const playableTiles = getPlayableTilesForNextMove(board, lastPlayedTile);

  const tiles: PlayableTile[] = [];
  playableTiles.forEach((tile: PlayableTile) => {
    let updatedBoard = JSON.parse(JSON.stringify(board));
    const { x: lineIndex, y: tileIndex } = findTile(updatedBoard, tile);
    const playedTile = playTile(tile, player);
    updatedBoard[lineIndex][tileIndex] = playedTile;

    if (getPlayableTilesForNextMove(updatedBoard, tile).length < 1) {
      tiles.push(tile);
    }
  });
  return tiles;
};
