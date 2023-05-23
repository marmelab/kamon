import { Board, clearAllowedTilesHighlight, getLastPlayedTile } from "../board";
import { getOppositePath, updateGraphState } from "../graph";
import { getPlayableTilesForNextMove } from "../move";
import { Player } from "../player";
import { PlayableTile, findTile, playTile } from "../tile";

export const getMissingTilesForPath = (
  player: Player,
  board: Board,
): PlayableTile[] => {
  const tiles: PlayableTile[] = [];
  const lastPlayedTile = getLastPlayedTile(board);
  const playableTiles = getPlayableTilesForNextMove(board, lastPlayedTile);

  playableTiles.forEach((tile: PlayableTile) => {
    let updatedBoard = structuredClone(board);
    const { x: lineIndex, y: tileIndex } = findTile(updatedBoard, tile);
    const playedTile = playTile(tile, player);
    updatedBoard[lineIndex][tileIndex] = playedTile;

    const graph = updateGraphState(player, updatedBoard);
    if (getOppositePath(graph).length > 0) {
      tiles.push(tile);
    }
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

export const simulatePlaying = (player: Player, board: Board) => {
  const tiles: PlayableTile[] = [];
  const lastPlayedTile = getLastPlayedTile(board);
  const playableTiles = getPlayableTilesForNextMove(board, lastPlayedTile);

  playableTiles.forEach((tile: PlayableTile, turn) => {
    let updatedBoard = structuredClone(board);
    updatedBoard = play(player, updatedBoard, tile);
    console.log(updatedBoard);
    //simulatePlaying(player, updatedBoard);
  });
};

export const play = (player: Player, board: Board, tile: PlayableTile) => {
  const { x: lineIndex, y: tileIndex } = findTile(board, tile);
  const playedTile = playTile(tile, player);
  board[lineIndex][tileIndex] = playedTile;
  return board;
};
