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
import { initRandomGame, initGameState, updateGame } from "@kamon/core";

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

    ({ gameState: state, board } = updateGame(board, state, { symbol, color }));

    if (state.isDraw === true) {
      return this.getStateUrl(state, board);
    }

    if (!!state.winner) {
      return this.getStateUrl(state, board);
    }

    return this.getStateUrl(state, board);
  }
}
