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
  getBlockedTiles,
  getMissingTilesForPath,
  highlightAllowedTiles,
  updateGame,
} from "@kamon/core";
import { EventsService } from "../events.service";
import { UpdateGameDto } from "./dto/update-game.dto";
import { ApiBody, ApiCreatedResponse } from "@nestjs/swagger";
import { Game } from "./game.entity";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { UsersService } from "../users/users.service";

@Controller()
export class GameController {
  constructor(
    private gameService: GameService,
    private readonly eventsService: EventsService,
    private readonly userService: UsersService,
  ) {}

  @Post("/game/create")
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({
    type: Game,
    description: "create a new game",
  })
  async createNewGame(
    @Res() response: Response,
    @Headers() headers,
    @Req() request,
  ) {
    const user = await this.userService.findOne(request.user.sub);
    const game = await this.gameService.createGame(user);
    if (headers.accept === "application/json") {
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
  async getOnGoingGames(@Headers() headers, @Res() response: Response) {
    const onGoing = await this.gameService.findOnGoing();

    if (headers.accept === "application/json") {
      return response.send(onGoing);
    }

    return response.render("listGame", { onGoing });
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
    @Req() request,
  ): Promise<any> {
    let foundGame = await this.gameService.findOne(gameId);

    if (!foundGame) {
      throw new NotFoundException();
    }

    const user = await this.userService.findOne(request.user.sub);

    if (!foundGame.player_white && user.id !== foundGame.player_black.id) {
      await this.gameService.setWhitePlayer(foundGame.id, user);
      foundGame = await this.gameService.findOne(gameId);
    }

    const board = highlightAllowedTiles(foundGame.board, foundGame.gameState);
    const game = await this.gameService.updateBoard(foundGame.id, board);

    response.cookie("gameId", `${foundGame.id}`);
    const playable = this.gameService.checkGameBelongToPlayer(foundGame, user);

    if (headers.accept === "application/json") {
      return response.send({ game, playable });
    }

    return response.render("index", { game, playable });
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
    @Req() request,
  ) {
    const foundGame = await this.gameService.findOne(gameId);

    const user = await this.userService.findOne(request.user.sub);

    const playable = this.gameService.checkGameBelongToPlayer(foundGame, user);

    if (!playable) {
      response.status(400);
      return response.send({
        error: "Game not playable",
      });
    }

    if (
      foundGame.gameState.currentPlayer === "black" &&
      foundGame.player_black.id !== user.id
    ) {
      response.status(400);
      return response.send({
        error: "Cannot play: Black turn",
      });
    }

    if (
      foundGame.gameState.currentPlayer === "white" &&
      foundGame.player_white.id !== user.id
    ) {
      response.status(400);
      return response.send({
        error: "Cannot play: White turn",
      });
    }

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

    let game = await this.gameService.updateBoard(foundGame.id, board);
    game = await this.gameService.updateGameState(foundGame.id, state);

    const sseId = `sse_game_refresh_${foundGame.id}`;
    this.eventsService.emit({ data: new Date().toISOString() }, sseId);

    if (headers.accept === "application/json") {
      return response.send(game);
    }

    response.cookie("gameId", foundGame.id);
    return response.redirect(`/game/${JSON.stringify(foundGame.id)}`);
  }

  @Post("/game/:gameId/help")
  @UseGuards(JwtAuthGuard)
  async seePossibleMove(
    @Param("gameId", ParseIntPipe) gameId: number,
    @Res() response: Response,
    @Req() request,
  ) {
    let game = await this.gameService.findOne(gameId);

    const user = await this.userService.findOne(request.user.sub);

    const playable = this.gameService.checkGameBelongToPlayer(game, user);

    if (!playable) {
      response.status(400);
      return response.send({
        error: "Game not playable",
      });
    }

    const missingTilesForPath = getMissingTilesForPath(
      game.gameState.currentPlayer,
      game.board,
    );

    const missingTilesForBlocked = getBlockedTiles(
      game.gameState.currentPlayer,
      game.board,
    );

    return response.send({ missingTilesForPath, missingTilesForBlocked });
  }
}
