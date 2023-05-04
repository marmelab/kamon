import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Redirect,
  Render,
  Req,
} from "@nestjs/common";
import {
  initRandomGame,
  initGameState,
  updateBoardState,
  checkIfDraw,
  setGameAsDraw,
  checkUserMove,
  updateGraphState,
  highlightAllowedTiles,
  getOppositePath,
  switchPlayer,
  checkIfGameWon,
  winGame,
} from "@kamon/core";

@Controller()
export class AppController {
  getStateUrl(state, board) {
    return { url: `/?game-state=${JSON.stringify({ state, board })}` };
  }

  @Get("/game/example")
  @Render("index")
  root(@Query("game-state") gameState) {
    let game;
    if (gameState) {
      gameState = JSON.parse(gameState);
      game = {
        state: gameState.state,
        board: gameState.board,
      };
    } else {
      game = {
        state: initGameState(),
        board: initRandomGame(),
      };
    }

    return {
      game,
    };
  }

  @Post("/game/example")
  @Redirect("/game/example")
  postGame(@Req() req: Request, @Body() body) {
    let board = JSON.parse(body["board"]);
    let state = JSON.parse(body["state"]);
    const [color, symbol] = body["played"].split("-");

    const { gameState, allowedMove } = checkUserMove(
      board,
      { value: { symbol, color } },
      state,
    );

    state = gameState;

    if (!allowedMove) {
      return this.getStateUrl(state, board);
    }

    state.turnNumber += 1;

    board = updateBoardState(board, { symbol, color }, state);

    if (checkIfDraw(state)) {
      state = setGameAsDraw(state);
      return this.getStateUrl(state, board);
    }

    const previousPlayer = state.currentPlayer;
    const graph = updateGraphState(state.currentPlayer, board);

    board = highlightAllowedTiles(board, state);

    if (getOppositePath(graph).length > 0) {
      state = {
        ...state,
        message: `!!!!!! ${state.currentPlayer.toUpperCase()} WON 🥳 !!!!!!`,
        winner: state.currentPlayer,
        isRunning: false,
      };
      return this.getStateUrl(state, board);
    }

    state = {
      ...state,
      currentPlayer: switchPlayer(state.currentPlayer),
      message: `${switchPlayer(state.currentPlayer).toUpperCase()}, your turn`,
    };

    const isGameWon = checkIfGameWon(gameState, board);
    if (isGameWon) {
      state = winGame(previousPlayer, state);
    }

    return this.getStateUrl(state, board);
  }
}
