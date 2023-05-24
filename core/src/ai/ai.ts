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

export const getMissingTilesForPath = (player: Player, board: Board) => {
  const lastPlayedTile = getLastPlayedTile(board);
  const playableTiles = getPlayableTilesForNextMove(board, lastPlayedTile);
  const paths = findBestPath(player, board);
  const tiles = [];
  paths.forEach((path) => {
    path.forEach((node) => {
      playableTiles.forEach((playableTile: PlayableTile) => {
        if (getTileName(playableTile) === node) tiles.push(playableTile);
      });
    });
  });

  return tiles;
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
      potentialPaths.push(
        graph.shortestPath(corners.green[0], corners.green[1]),
      );
    } catch {
      potentialPaths.push([]);
    }
    try {
      potentialPaths.push(graph.shortestPath(corners.blue[0], corners.blue[1]));
    } catch {
      potentialPaths.push([]);
    }
    try {
      potentialPaths.push(
        graph.shortestPath(corners.yellow[0], corners.yellow[1]),
      );
    } catch {
      potentialPaths.push([]);
    }
  });

  return potentialPaths
    .sort((currentPath, nextPath) => currentPath.weight - nextPath.weight)
    .filter((path, index, paths) => path.weight === paths[0].weight);
};
