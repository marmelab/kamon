import { Graph } from "graph-data-structure";
import { Board } from "../board/board";
import {
  PlayableTile,
  findFirstPlayableTile,
  findLastPlayableTile,
  getTileName,
} from "../tile/tile";

export const corners = {
  green: ["A-corner", "D-corner"],
  blue: ["E-corner", "B-corner"],
  yellow: ["F-corner", "C-corner"],
};

export const createGraph = (board: Board) => {
  const graph = Graph();

  for (const key in corners) {
    if (Object.prototype.hasOwnProperty.call(corners, key)) {
      const corner = corners[key];
      graph.addNode(corner[0]);
      graph.addNode(corner[1]);
    }
  }

  board.forEach((line, i) => {
    if (i === 0) {
      line.forEach((tile) => {
        if (tile != undefined)
          graph.addEdge(corners.green[0], getTileName(tile));
      });
    }

    if (i >= 0 && i <= 3) {
      graph.addEdge(
        corners.yellow[0],
        getTileName(findFirstPlayableTile(line))
      );
      graph.addEdge(corners.blue[1], getTileName(findLastPlayableTile(line)));
    }

    if (i >= 3 && i <= 6) {
      graph.addEdge(corners.blue[0], getTileName(findFirstPlayableTile(line)));
      graph.addEdge(corners.yellow[1], getTileName(findLastPlayableTile(line)));
    }

    if (i === board.length - 1) {
      line.forEach((tile) => {
        if (tile != undefined)
          graph.addEdge(corners.green[1], getTileName(tile));
      });
    }
  });

  return graph;
};

const addTileToGraph = (graph, tile: PlayableTile) => {
  graph.addNode(getTileName(tile));
  return graph;
};
