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
import { initRandomGame } from "@kamon/core";

@Controller()
export class AppController {
  @Get("/")
  @Render("index")
  root(@Query("game-state") gameState) {
    let game;
    if (gameState) {
      gameState = JSON.parse(gameState);
      game = {
        gameState: {
          currentPlayer: "white",
          isRunning: true,
          winner: "white",
          isDraw: false,
          turnNumber: 2,
          remainingTiles: {
            black: 17,
            white: 18,
          },
          message: "Welcome to Kamon 🍱 ! Black player, you turn",
        },
        board: JSON.parse(gameState.board),
      };
    } else {
      game = {
        gameState: {
          currentPlayer: "white",
          isRunning: true,
          winner: "white",
          isDraw: false,
          turnNumber: 2,
          remainingTiles: {
            black: 17,
            white: 18,
          },
          message: "Welcome to Kamon 🍱 ! Black player, you turn",
        },
        board: initRandomGame(),
      };
    }

    return {
      game,
    };
  }

  @Post("/")
  @Redirect("/")
  postGame(@Req() req: Request, @Body() gameState) {
    // TODO: update the game state
    gameState = JSON.parse(JSON.stringify(gameState));
    const played = gameState.played;
    return { url: `/?game-state=${JSON.stringify(gameState)}` };
  }
}
