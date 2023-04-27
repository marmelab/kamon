import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Render,
  Req,
  Res,
} from "@nestjs/common";
import { Request, Response } from "express";
import { GameService } from "./game.service";
import { GameResponseTemplate } from "./game.template";
import { setAllowedTiles } from "@kamon/core";

@Controller()
export class GameController {
  constructor(private gameService: GameService) {}

  @Get()
  @Render("launchGamePage")
  async launchGame(
    @Res() response: Response,
    @Req() request: Request,
  ): Promise<void> {}

  @Get("/game/create")
  @Render("launchGamePage")
  async createNewGame(
    @Res() response: Response,
    @Req() request: Request,
  ): Promise<void> {
    const newGame = await this.gameService.createGame();
    return response.redirect(JSON.stringify(newGame.id));
  }

  @Get("/game/:gameId")
  @Render("index")
  async renderGame(
    @Param("gameId", ParseIntPipe) gameId: number,
    @Res() response: Response,
    @Req() request: Request,
  ): Promise<GameResponseTemplate> {
    let foundGame = await this.gameService.findOne(gameId);

    foundGame.board = setAllowedTiles(foundGame.board, foundGame.gameState);
    return { game: foundGame };
  }
}
