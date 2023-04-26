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
  findTile,
  initGameState,
  updateBoardState,
} from "@kamon/core";

@Controller()
export class AppController {
  @Get("/")
  @Render("index")
  root(@Query("game-state") gameState) {
    let game;

    if (gameState) {
      game = {
        state: JSON.parse(gameState).state,
        board: JSON.parse(gameState).board,
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

  @Post("/")
  @Redirect("/")
  postGame(@Req() req: Request, @Body() body) {
    const board = JSON.parse(body["board"]);
    const state = JSON.parse(body["state"]);
    const [color, symbol] = body["played"].split("-");

    const gameState = {
      state,
      board: updateBoardState(board, { symbol, color }, state),
    };
    return { url: `/?game-state=${JSON.stringify(gameState)}` };
  }
}
