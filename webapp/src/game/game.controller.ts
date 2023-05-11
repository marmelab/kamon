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
  NotFoundException,
  Headers,
  UseGuards,
} from "@nestjs/common";
import { Response } from "express";
import { GameService } from "./game.service";
import {
  findTileByCoordinate,
  highlightAllowedTiles,
  updateGame,
} from "@kamon/core";
import { EventsService } from "../events.service";
import { UpdateGameDto } from "./dto/update-game.dto";
import { ApiBody, ApiCreatedResponse } from "@nestjs/swagger";
import { Game } from "./game.entity";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller()
export class GameController {
  constructor(
    private gameService: GameService,
    private readonly eventsService: EventsService,
  ) {}

  @Post("/game/create")
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({
    type: Game,
    description: "create a new game",
  })
  async createNewGame(@Res() response: Response, @Headers() headers) {
    const newGame = await this.gameService.createGame();
    const board = highlightAllowedTiles(newGame.board, newGame.gameState);
    const game = await this.gameService.updateBoard(newGame.id, board);

    if (headers?.accept && headers.accept === "application/json") {
      return response.send(game);
    }

    return response.redirect(`/game/${JSON.stringify(game.id)}`);
  }

  @Get("/game/ongoing")
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({
    type: Game,
    description: "Get a game",
  })
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
    const game = await this.gameService.updateBoard(foundGame.id, board);

    response.cookie("gameId", `${foundGame.id}`);

    if (headers?.accept && headers.accept === "application/json") {
      return response.send(game);
    }

    return response.render("index", { game });
  }

  @Sse("sse_game_resfresh")
  events(@Req() req) {
    const gameId = req.cookies.gameId;
    return this.eventsService.subscribe(`sse_game_refresh_${gameId}`);
  }

  @Post("/game/:gameId")
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: UpdateGameDto })
  @ApiCreatedResponse({
    type: Game,
    description: "Send the coordinates of the played tile to update the game",
  })
  async updateGame(
    @Param("gameId", ParseIntPipe) gameId: number,
    @Res() response: Response,
    @Body() body: UpdateGameDto,
    @Headers() headers,
  ) {
    const foundGame = await this.gameService.findOne(gameId);
    const sseId = `sse_game_refresh_${foundGame.id}`;

    const coords = body.played.split("-").map((el) => {
      return Number(el);
    });
    const [x, y] = coords;

    response.cookie("gameId", foundGame.id);
    const tile = findTileByCoordinate(foundGame.board, { x, y });
    const { gameState: state, board } = updateGame(
      foundGame.board,
      foundGame.gameState,
      tile,
    );

    let game = await this.gameService.updateBoard(foundGame.id, board);
    game = await this.gameService.updateGameState(foundGame.id, state);
    this.eventsService.emit({ data: new Date().toISOString() }, sseId);

    if (headers?.accept && headers.accept === "application/json") {
      return response.send(game);
    }

    return response.redirect(`/game/${JSON.stringify(foundGame.id)}`);
  }
}
