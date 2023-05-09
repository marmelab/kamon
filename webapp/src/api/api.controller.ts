import {
  findTileByCoordinate,
  highlightAllowedTiles,
  updateGame,
} from "@kamon/core/dist";
import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  Res,
  Sse,
} from "@nestjs/common";
import { Response } from "express";
import { ApiBody, ApiCreatedResponse } from "@nestjs/swagger";
import { EventsService } from "../events.service";
import { UpdateGameDto } from "../game/dto/update-game.dto";
import { Game } from "../game/game.entity";
import { GameService } from "../game/game.service";

@Controller("api")
export class ApiController {
  constructor(
    private gameService: GameService,
    private readonly eventsService: EventsService,
  ) {}

  @Post("/game/create")
  @ApiCreatedResponse({
    type: Game,
    description: "create a new game",
  })
  async createNewGame(): Promise<Game> {
    const newGame = await this.gameService.createGame();
    const board = highlightAllowedTiles(newGame.board, newGame.gameState);
    await this.gameService.updateBoard(newGame.id, board);

    return newGame;
  }

  @Get("/game/ongoing")
  @ApiCreatedResponse({
    type: [Game],
    description: "Get all ongoing games",
  })
  async getOnGoingGames(): Promise<Game[]> {
    const onGoing = await this.gameService.findOnGoing();

    if (onGoing.length < 1) {
      throw new NotFoundException();
    }
    return onGoing;
  }

  @Get("/game/:gameId")
  @ApiCreatedResponse({
    type: Game,
    description: "Get a game",
  })
  async get(
    @Param("gameId", ParseIntPipe) gameId: number,
    @Res() response: Response,
  ): Promise<Game> {
    const foundGame = await this.gameService.findOne(gameId);

    if (!foundGame) {
      throw new NotFoundException();
    }

    const board = highlightAllowedTiles(foundGame.board, foundGame.gameState);
    const updatedGame = await this.gameService.updateBoard(foundGame.id, board);
    response.cookie("gameId", `${foundGame.id}`);
    response.send(updatedGame);
    return updatedGame;
  }

  @Get("/game")
  @ApiCreatedResponse({
    type: [Game],
    description: "Get all the games",
  })
  getAll(): Promise<Game[]> {
    return this.gameService.findAll();
  }

  @Patch("/game/:id/run")
  @ApiCreatedResponse({
    type: Game,
    description: "Run a game",
  })
  async run(@Param("id") id: number): Promise<Game> {
    let game = await this.gameService.findOne(id);
    if (!game) {
      throw new NotFoundException();
    }

    await this.gameService.makeRun(id);

    game = await this.gameService.findOne(id);
    return game;
  }

  @Patch("/game/:id/stop")
  @ApiCreatedResponse({
    type: Game,
    description: "Stop a game",
  })
  async stop(@Param("id") id: number): Promise<Game> {
    let game = await this.gameService.findOne(id);
    if (!game) {
      throw new NotFoundException();
    }

    await this.gameService.makeStop(id);

    game = await this.gameService.findOne(id);
    return game;
  }
}
