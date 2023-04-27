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
  green: ["green-start", "green-end"],
  blue: ["blue-start", "blue-end"],
  yellow: ["yellow-start", "yellow-end"],
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
        getTileName(findFirstPlayableTile(line) as PlayableTile),
      );
      graph.addEdge(getTileName(findLastPlayableTile(line)), corners.blue[1]);
    }

    if (i >= 3 && i <= 6) {
      graph.addEdge(
        corners.blue[0],
        getTileName(findFirstPlayableTile(line) as PlayableTile),
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
          graph.addEdge(getTileName(tile), getTileName(sibling));
        }
      }
    });
  });
  return graph;
};

export const getOppositePath = (
  graph: ReturnType<typeof Graph>,
): string[] | [] => {
  let path: string[] | [];
  for (const key in corners) {
    const corner = corners[key];
    try {
      path = graph.shortestPath(corner[0], corner[1]) as string[];
      if (path.length > 0) return path;
    } catch (error) {
      path = [];
    }
  }
  return path;
};

export const findLoop = (graph: ReturnType<typeof Graph>): string[] | [] => {
  let path: string[] | [];

  for (const node in graph.nodes()) {
    try {
      path = graph.shortestPath(node, node) as string[];
      if (path.length > 0) return path;
    } catch (error) {
      path = [];
    }
  }

  return path;
};
