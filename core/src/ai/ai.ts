import path from "path";
import { Board, clearAllowedTilesHighlight, getLastPlayedTile } from "../board";
import { corners, createGraph } from "../graph";
import { getPlayableTilesForNextMove } from "../move";
import { Player, switchPlayer } from "../player";
import {
  PlayableTile,
  findSiblings,
  findTile,
  getTileName,
  playTile,
} from "../tile";

export const getMissingTilesForPath = (
  player: Player,
  board: Board,
): PlayableTile[] => {
  const paths = findBestPath(player, board).map(({ tile }) => tile);
  return paths.filter(
    (e, i) =>
      paths.findIndex((a) => a.color === e.color && a.symbol === e.symbol) ===
      i,
  );
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
    let updatedBoard = structuredClone(board);
    const { x: lineIndex, y: tileIndex } = findTile(updatedBoard, tile);
    const playedTile = playTile(tile, player);
    updatedBoard[lineIndex][tileIndex] = playedTile;

    if (getPlayableTilesForNextMove(updatedBoard, tile).length < 1) {
      tiles.push(tile);
    }
  });
  return tiles;
};

export const findBestPath = (player: Player, board: Board) => {
  const lastPlayedTile = getLastPlayedTile(board);
  const playableTiles = getPlayableTilesForNextMove(board, lastPlayedTile);
  const potentialPaths = [];

  playableTiles.forEach((tile: PlayableTile) => {
    const updatedBoard = structuredClone(board);
    const { x, y } = findTile(updatedBoard, tile);
    const playedTile = playTile(tile, player);
    updatedBoard[x][y] = playedTile;
    const graph = createGraph(updatedBoard, player);

    for (const lines of updatedBoard) {
      for (const tile of lines) {
        if (!tile) continue;
        const { x, y } = findTile(updatedBoard, tile);
        const siblings = findSiblings(updatedBoard, {
          x,
          y,
        });
        for (const key in siblings) {
          const sibling = siblings[key];
          if (!sibling) continue;
          if (sibling?.playedBy === switchPlayer(player)) continue;

          const weight =
            sibling?.playedBy === player && tile.playedBy === player ? 0 : 1;

          graph.addEdge(
            getTileName(tile as PlayableTile),
            getTileName(sibling),
            weight,
          );
        }
      }
    }

    try {
      potentialPaths.push({
        tile,
        path: graph.shortestPath(corners.green[0], corners.green[1]),
      });

      potentialPaths.push({
        tile,
        path: graph.shortestPath(corners.blue[0], corners.blue[1]),
      });

      potentialPaths.push({
        tile,
        path: graph.shortestPath(corners.yellow[0], corners.yellow[1]),
      });
    } catch {
      potentialPaths.push([]);
    }
  });

  return potentialPaths
    .sort(
      (currentPath, nextPath) => currentPath.path.weight - nextPath.path.weight,
    )
    .filter((path, index, paths) => path.path.weight === paths[0].path.weight);
};
