import { Graph } from "graph-data-structure";
import { Board } from "../board/board";
import {
  findFirstPlayableTile,
  findLastPlayableTile,
  getTileName,
} from "../tile/tile";

export const corners = ["A", "B", "C", "D", "E", "F"] as const;
export type Corner = (typeof corners)[number];
export const createGraph = (board: Board) => {
  const graph = Graph();
  corners.forEach((corner) => {
    graph.addNode(corner);
  });

  board.forEach((line, i) => {
    if (i === 0) {
      line.forEach((tile) => {
        if (tile != undefined) graph.addEdge("A", getTileName(tile));
      });
    }

    if (i >= 0 && i <= 3) {
      graph.addEdge("F", getTileName(findFirstPlayableTile(line)));
      graph.addEdge("B", getTileName(findLastPlayableTile(line)));
    }

    if (i >= 3 && i <= 6) {
      graph.addEdge("E", getTileName(findFirstPlayableTile(line)));
      graph.addEdge("C", getTileName(findLastPlayableTile(line)));
    }

    if (i === board.length - 1) {
      line.forEach((tile) => {
        if (tile != undefined) graph.addEdge("D", getTileName(tile));
      });
    }
  });

  return graph;
};
