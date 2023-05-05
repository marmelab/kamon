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
  Res,
} from "@nestjs/common";
import { ApiBody } from "@nestjs/swagger";
import { EventsService } from "src/events.service";
import { UpdateGameDto } from "src/game/dto/update-game.dto";
import { Game } from "src/game/game.entity";
import { GameService } from "src/game/game.service";

@Controller("api")
export class ApiController {
  constructor(
    private gameService: GameService,
    private readonly eventsService: EventsService,
  ) {}

  @Post("/game/create")
  async createNewGame(): Promise<Game> {
    const newGame = await this.gameService.createGame();
    const board = highlightAllowedTiles(newGame.board, newGame.gameState);
    await this.gameService.updateBoard(newGame.id, board);

    return newGame;
  }

  @Get("/game/ongoing")
  async getOnGoingGames(): Promise<Game[]> {
    const onGoing = await this.gameService.findOnGoing();

    if (onGoing.length < 1) {
      throw new NotFoundException();
    }
    return onGoing;
  }

  @Get("/game/:gameId")
  async get(@Param("gameId", ParseIntPipe) gameId: number): Promise<Game> {
    const foundGame = await this.gameService.findOne(gameId);

    if (!foundGame) {
      throw new NotFoundException();
    }

    const board = highlightAllowedTiles(foundGame.board, foundGame.gameState);
    const updatedGame = await this.gameService.updateBoard(foundGame.id, board);
    return updatedGame;
  }

  @Get("/game")
  getAll(): Promise<Game[]> {
    return this.gameService.findAll();
  }

  @Patch("/game/:id/run")
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
  async stop(@Param("id") id: number): Promise<Game> {
    let game = await this.gameService.findOne(id);
    if (!game) {
      throw new NotFoundException();
    }

    await this.gameService.makeStop(id);

    game = await this.gameService.findOne(id);
    return game;
  }

  @Post("/game/:gameId")
  @ApiBody({ type: UpdateGameDto })
  async updateGame(
    @Param("gameId", ParseIntPipe) gameId: number,
    @Body() body: UpdateGameDto,
  ) {
    const foundGame = await this.gameService.findOne(gameId);
    const sseId = `sse_game_refresh_${foundGame.id}`;

    const coords = body.played.split("-").map((el) => {
      return Number(el);
    });
    const [x, y] = coords;

    const tile = findTileByCoordinate(foundGame.board, { x, y });

    const { gameState: state, board } = updateGame(
      foundGame.board,
      foundGame.gameState,
      tile,
    );

    await this.gameService.updateBoard(foundGame.id, board);
    await this.gameService.updateGameState(foundGame.id, state);
    this.eventsService.emit({ data: new Date().toISOString() }, sseId);
  }
}
