import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Res,
  Body,
  Sse,
  Patch,
  NotFoundException,
  Headers,
} from "@nestjs/common";
import { Response } from "express";
import { GameService } from "./game.service";
import { highlightAllowedTiles, updateGame } from "@kamon/core";
import { EventsService } from "../events.service";

@Controller()
export class GameController {
  constructor(
    private gameService: GameService,
    private readonly eventsService: EventsService,
  ) {}

  @Post("/game/create")
  async createNewGame(@Res() response: Response): Promise<void> {
    const newGame = await this.gameService.createGame();
    const board = highlightAllowedTiles(newGame.board, newGame.gameState);
    await this.gameService.updateBoard(newGame.id, board);

    return response.redirect(`/game/${JSON.stringify(newGame.id)}`);
  }

  @Get("/game/ongoing")
  async findOnGoingGames() {
    const onGoing = await this.gameService.findOnGoing();

    if (onGoing.length < 1) {
      throw new NotFoundException();
    }
    return onGoing;
  }

  @Get("/game/:gameId")
  async renderGame(
    @Param("gameId", ParseIntPipe) gameId: number,
    @Res() response: Response,
    @Headers() headers,
  ): Promise<any> {
    const foundGame = await this.gameService.findOne(gameId);

    if (!foundGame) {
      throw new NotFoundException();
    }

    const board = highlightAllowedTiles(foundGame.board, foundGame.gameState);
    const updatedGame = await this.gameService.updateBoard(foundGame.id, board);

    if (headers["accept"].includes("text/html")) {
      response.cookie("gameId", `${foundGame.id}`);
      return response.render("index", { game: updatedGame });
    }

    return response.send({ game: updatedGame });
  }

  @Sse("sse_game_resfresh")
  events(@Req() req) {
    const gameId = req.cookies.gameId;
    return this.eventsService.subscribe(`sse_game_refresh_${gameId}`);
  }

  @Post("/game/:gameId")
  async updateGame(
    @Param("gameId", ParseIntPipe) gameId: number,
    @Res() response: Response,
    @Body() body,
  ): Promise<void> {
    const foundGame = await this.gameService.findOne(gameId);
    const sseId = `sse_game_refresh_${foundGame.id}`;
    let board = JSON.parse(body["board"]);
    let state = JSON.parse(body["state"]);
    const [color, symbol] = body["played"].split("-");

    const sendResponse = async () => {
      await this.gameService.updateBoard(foundGame.id, board);
      await this.gameService.updateGameState(foundGame.id, state);
      this.eventsService.emit({ data: new Date().toISOString() }, sseId);
      return response.redirect(`/game/${JSON.stringify(foundGame.id)}`);
    };

    response.cookie("gameId", foundGame.id);

    ({ gameState: state, board } = updateGame(board, state, { symbol, color }));

    if (state.isDraw) {
      return sendResponse();
    }

    if (state.winner) {
      return sendResponse();
    }

    return sendResponse();
  }

  @Get("/game/link/:gameId")
  async getLinkForJoiningGame(
    @Param("gameId", ParseIntPipe) gameId: number,
    @Res() response: Response,
    @Headers() headers,
  ): Promise<any> {
    const foundGame = await this.gameService.findOne(gameId);

    if (!foundGame) {
      throw new NotFoundException();
    }
  }

  @Post("/game/join/:gameId")
  async joinGame(
    @Param("gameId", ParseIntPipe) gameId: number,
    @Res() response: Response,
    @Body() body,
  ): Promise<void> {
    const foundGame = await this.gameService.findOne(gameId);

    if (!foundGame) {
      throw new NotFoundException();
    }

    foundGame;
  }

  @Get("/game")
  findAll() {
    return this.gameService.findAll();
  }

  @Patch("/game/:id/run")
  async run(@Param("id") id: number) {
    let game = await this.gameService.findOne(id);
    if (!game) {
      throw new NotFoundException();
    }

    const updated = await this.gameService.makeRun(id);

    if (updated.affected < 0) {
      return { error: "Game not updated" };
    }
    game = await this.gameService.findOne(id);
    return game;
  }

  @Patch("/game/:id/stop")
  async stop(@Param("id") id: number) {
    let game = await this.gameService.findOne(id);
    if (!game) {
      throw new NotFoundException();
    }

    const updated = await this.gameService.makeStop(id);
    if (updated.affected < 0) {
      return { error: "Game not updated" };
    }

    game = await this.gameService.findOne(id);
    return game;
  }
}
