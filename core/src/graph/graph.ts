import { Graph } from "graph-data-structure";
import { Board } from "../board/boardType";
import {
  PlayableTile,
  findFirstPlayableTile,
  findLastPlayableTile,
  findSiblings,
  findTile,
  getTileName,
} from "../tile/tile";
import { Player, switchPlayer } from "../player/player";

export const corners = {
  green: ["green-start", "green-end"],
  blue: ["blue-start", "blue-end"],
  yellow: ["yellow-start", "yellow-end"],
};

export const createGraph = (board: Board, player: Player) => {
  const graph = Graph();
  for (const key in corners) {
    const corner = corners[key];
    graph.addNode(corner[0]);
    graph.addNode(corner[1]);
  }

  board.forEach((line, x) => {
    if (x === 0) {
      line.forEach((tile: PlayableTile) => {
        if (!tile) return;
        if (tile.playedBy && tile.playedBy === switchPlayer(player)) return;

        graph.addEdge(
          corners.green[0],
          getTileName(tile),
          getWeight(tile, player),
        );
      });
    }

    if (x >= 0 && x <= 3) {
      const firstTile = findFirstPlayableTile(line);
      const lastTile = findLastPlayableTile(line);

      if (
        firstTile.playedBy &&
        firstTile.playedBy === switchPlayer(player) &&
        lastTile.playedBy &&
        lastTile.playedBy === switchPlayer(player)
      )
        return;

      graph.addEdge(
        corners.yellow[0],
        getTileName(firstTile),
        getWeight(firstTile, player),
      );
      graph.addEdge(
        getTileName(lastTile),
        corners.blue[1],
        getWeight(lastTile, player),
      );
    }

    if (x >= 3 && x <= 6) {
      const firstTile = findFirstPlayableTile(line);
      const lastTile = findLastPlayableTile(line);

      if (
        firstTile.playedBy &&
        firstTile.playedBy === switchPlayer(player) &&
        lastTile.playedBy &&
        lastTile.playedBy === switchPlayer(player)
      )
        return;

      graph.addEdge(
        corners.blue[0],
        getTileName(firstTile),
        getWeight(firstTile, player),
      );
      graph.addEdge(
        getTileName(lastTile),
        corners.yellow[1],
        getWeight(firstTile, player),
      );
    }

    if (x === board.length - 1) {
      line.forEach((tile: PlayableTile) => {
        if (!tile) return;
        if (tile.playedBy && tile.playedBy === switchPlayer(player)) return;
        graph.addEdge(
          getTileName(tile),
          corners.green[1],
          getWeight(tile, player),
        );
      });
    }
  });

  return graph;
};

export const updateGraphState = (player: Player, board: Board) => {
  const graph = createGraph(board, player);
  board.forEach((line) => {
    line.forEach((tile: PlayableTile) => {
      if (!tile) return;
      if (tile.playedBy !== player) return;
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

const getWeight = (tile: PlayableTile, player: Player = null) => {
  return tile?.playedBy === player ? 0 : 1;
};
