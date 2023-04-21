import { Graph } from "graph-data-structure";
import { Board } from "../board/board";
import {
  PlayableTile,
  findFirstPlayableTile,
  findLastPlayableTile,
  findSiblings,
  findTile,
  getTileName,
} from "../tile/tile";
import { Player } from "../player/player";

export const corners = {
  green: ["A-corner", "D-corner"],
  blue: ["E-corner", "B-corner"],
  yellow: ["F-corner", "C-corner"],
};

export const createGraph = (board: Board) => {
  const graph = Graph();

  for (const key in corners) {
    const corner = corners[key];
    graph.addNode(corner[0]);
    graph.addNode(corner[1]);
  }

  board.forEach((line, i) => {
    if (i === 0) {
      line.forEach((tile: PlayableTile) => {
        if (tile != undefined)
          graph.addEdge(corners.green[0], getTileName(tile));
      });
    }

    if (i >= 0 && i <= 3) {
      graph.addEdge(
        corners.yellow[0],
        getTileName(findFirstPlayableTile(line) as PlayableTile)
      );
      graph.addEdge(getTileName(findLastPlayableTile(line)), corners.blue[1]);
    }

    if (i >= 3 && i <= 6) {
      graph.addEdge(
        corners.blue[0],
        getTileName(findFirstPlayableTile(line) as PlayableTile)
      );
      graph.addEdge(getTileName(findLastPlayableTile(line)), corners.yellow[1]);
    }

    if (i === board.length - 1) {
      line.forEach((tile) => {
        if (tile != undefined)
          graph.addEdge(getTileName(tile as PlayableTile), corners.green[1]);
      });
    }
  });

  return graph;
};

export const updateGraphState = (player: Player, board: Board) => {
  const graph = createGraph(board);
  board.forEach((line) => {
    line.forEach((tile: PlayableTile) => {
      if (!tile) return;
      const { x, y } = findTile(board, tile);
      const siblings = findSiblings(board, { x, y }, player);
      for (const key in siblings) {
        const sibling = siblings[key];

        if (sibling !== null) {
          graph
            .addEdge(getTileName(tile), getTileName(sibling))
            .addEdge(getTileName(sibling), getTileName(tile));
        }
      }
    });
  });
  return graph;
};

export const checkOppositePath = (graph): [] => {
  for (const key in corners) {
    const corner = corners[key];
    try {
      return graph.shortestPath(corner[0], corner[1]);
    } catch (error) {
      return [];
    }
  }
};
