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
  Render,
  Headers,
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
import {
  ApiBody,
  ApiCreatedResponse,
  ApiExcludeController,
} from "@nestjs/swagger";
import { Game } from "./game.entity";

@Controller()
//@ApiExcludeController()
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

  @Get("/game/:gameId")
  @Render("index")
  async renderGame(
    @Param("gameId", ParseIntPipe) gameId: number,
    @Res() response: Response,
  ): Promise<any> {
    const foundGame = await this.gameService.findOne(gameId);

    if (!foundGame) {
      throw new NotFoundException();
    }

    const board = highlightAllowedTiles(foundGame.board, foundGame.gameState);
    const updatedGame = await this.gameService.updateBoard(foundGame.id, board);

    response.cookie("gameId", `${foundGame.id}`);
    return { game: updatedGame };
  }

  @Sse("sse_game_resfresh")
  events(@Req() req) {
    const gameId = req.cookies.gameId;
    return this.eventsService.subscribe(`sse_game_refresh_${gameId}`);
  }

  @Post("/game/:gameId")
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
