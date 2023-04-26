import {
  findLastPLayed,
  findTile,
  findTileByCoordinate,
  NEUTRALE_TILE,
  PlayableTile,
  playTile,
  removeLastPlayed,
  Tile,
} from "../tile/tile";
import { GameState } from "../game/state";
import {
  Action,
  ALLOWED_FIRST_MOVES,
  getPlayableTilesForNextMove,
} from "../move/move";

export type NullableTile = Tile | null;
export type Board = NullableTile[][];

export const getLastPlayedTile = (board: Board): NullableTile => {
  let lastPlayedTile: NullableTile;

  board.forEach((line) => {
    if (lastPlayedTile != undefined) {
      return;
    }
    line.forEach((tile: Tile) => {
      if (lastPlayedTile != undefined || tile == undefined) {
        return;
      }
      if (tile.lastPlayed) {
        lastPlayedTile = tile;
      }
    });
  });

  return lastPlayedTile;
};

const clearAllowedTilesHighlight = (board: Board): Board => {
  const newBoard = JSON.parse(JSON.stringify(board));
  board.forEach((line, y) => {
    line.forEach((tile, x) => {
      if (newBoard[y][x] == null) {
        return;
      }
      newBoard[y][x].moveAllowed = undefined;
    });
  });
  return newBoard;
};

export const highlightAllowedTiles = (
  board: Board,
  gameState: GameState,
): Board => {
  const newBoard = clearAllowedTilesHighlight(board);
  if (gameState.turnNumber === 0) {
    ALLOWED_FIRST_MOVES.forEach((line, y) => {
      line.forEach((tile, x) => {
        if (
          newBoard[y][x] == null ||
          newBoard[y][x].symbol === NEUTRALE_TILE.symbol
        ) {
          return;
        }

        newBoard[y][x].moveAllowed = ALLOWED_FIRST_MOVES[y][x];
      });
    });
    return newBoard;
  }
  const lastPlayedTile = getLastPlayedTile(board);
  const playableTiles = getPlayableTilesForNextMove(board, lastPlayedTile);
  playableTiles.forEach((tile) => {
    const { x, y } = findTile(board, tile);
    newBoard[x][y].moveAllowed = true;
  });

  return newBoard.map((line) =>
    line.map((tile) => {
      if (tile == null) {
        return null;
      }
      let newTile = { ...tile };
      newTile.moveAllowed = tile.moveAllowed === true;
      return newTile;
    }),
  );
};

export const updateBoardState = (
  board: Board,
  tile: PlayableTile,
  gameState: GameState,
): Board => {
  const { x: lastPlayedLineIndex, y: lastPlayedTileIndex } =
    findLastPLayed(board);

  if (lastPlayedLineIndex != undefined && lastPlayedTileIndex != undefined) {
    board[lastPlayedLineIndex][lastPlayedTileIndex] = removeLastPlayed(
      board[lastPlayedLineIndex][lastPlayedTileIndex] as PlayableTile,
    );
  }

  const { x: lineIndex, y: tileIndex } = findTile(board, tile);
  const playedTile = playTile(
    findTileByCoordinate(board, { x: lineIndex, y: tileIndex }),
    gameState.currentPlayer,
  );

  board[lineIndex][tileIndex] = playedTile;

  const highlightedBoard = highlightAllowedTiles(board, gameState);

  return highlightedBoard;
};