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
import { Game } from "./game.entity";
import { GameResponseTemplate } from "./game.template";

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
    const foundGame = await this.gameService.findOne(gameId);
    return { game: foundGame };
  }
}
