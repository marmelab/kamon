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
} from "@nestjs/common";
import { ApiBody, ApiCreatedResponse } from "@nestjs/swagger";
import { EventsService } from "..//events.service";
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

  @Post("/game/:gameId")
  @ApiBody({ type: UpdateGameDto })
  @ApiCreatedResponse({
    type: Game,
    description: "Send the coordinates of the played tile to update the game",
  })
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
