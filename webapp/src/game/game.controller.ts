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
import { Request, Response } from "express";
import { GameService } from "./game.service";
import {
  checkIfDraw,
  setGameAsDraw,
  checkUserMove,
  updateBoardState,
  updateGraphState,
  highlightAllowedTiles,
  getOppositePath,
  switchPlayer,
  checkIfGameWon,
  winGame,
  updateRemainingTiles,
} from "@kamon/core";
import { EventsService } from "../events.service";
import { UpdateGameDto } from "./dto/update-game.dto";

@Controller()
export class GameController {
  constructor(
    private gameService: GameService,
    private readonly eventsService: EventsService,
  ) {}

  @Post("/game/create")
  async createNewGame(
    @Res() response: Response,
    @Req() request: Request,
  ): Promise<void> {
    const newGame = await this.gameService.createGame();
    const board = highlightAllowedTiles(newGame.board, newGame.gameState);
    await this.gameService.updateBoard(newGame.id, board);

    return response.redirect(`/game/${JSON.stringify(newGame.id)}`);
  }

  @Get("/game/:gameId")
  async renderGame(
    @Param("gameId", ParseIntPipe) gameId: number,
    @Res() response: Response,
    @Headers() headers,
  ): Promise<any> {
    const foundGame = await this.gameService.findOne(gameId);

    const board = highlightAllowedTiles(foundGame.board, foundGame.gameState);
    const updatedGame = await this.gameService.updateBoard(foundGame.id, board);

    if (headers["accept"] === "text/html") {
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
    @Req() req: Request,
    @Body() body,
  ): Promise<void> {
    const foundGame = await this.gameService.findOne(gameId);
    const sseId = `sse_game_refresh_${foundGame.id}`;
    let board = JSON.parse(body["board"]);
    let state = JSON.parse(body["state"]);
    const [color, symbol] = body["played"].split("-");

    const { gameState, allowedMove } = checkUserMove(
      board,
      { value: { symbol, color } },
      state,
    );

    response.cookie("gameId", foundGame.id);

    state = gameState;
    const sendResponse = async () => {
      await this.gameService.updateBoard(foundGame.id, board);
      await this.gameService.updateGameState(foundGame.id, state);
      this.eventsService.emit({ data: new Date().toISOString() }, sseId);
      return response.redirect(`/game/${JSON.stringify(foundGame.id)}`);
    };

    if (!allowedMove) {
      return sendResponse();
    }

    state.turnNumber += 1;
    state = updateRemainingTiles(state);

    board = updateBoardState(board, { symbol, color }, state);

    if (checkIfDraw(state)) {
      state = setGameAsDraw(state);
      return sendResponse();
    }

    const previousPlayer = state.currentPlayer;
    const graph = updateGraphState(state.currentPlayer, board);

    if (getOppositePath(graph).length > 0) {
      state = {
        ...state,
        message: `!!!!!! ${state.currentPlayer.toUpperCase()} WON 🥳 !!!!!!`,
        winner: state.currentPlayer,
        isRunning: false,
      };
      return sendResponse();
    }

    state = {
      ...state,
      currentPlayer: switchPlayer(state.currentPlayer),
      message: `${switchPlayer(state.currentPlayer).toUpperCase()}, your turn`,
    };

    const isGameWon = checkIfGameWon(gameState, board);
    if (isGameWon) {
      state = winGame(previousPlayer, state);
    }

    return sendResponse();
  }

  @Get("/games")
  findAll() {
    return this.gameService.findAll();
  }

  @Get("games/ongoing")
  async findOnGoingGames() {
    const onGoing = await this.gameService.findOnGoing();

    if (onGoing.length < 1) {
      throw new NotFoundException();
    }
    return onGoing;
  }

  @Patch("/games/:id")
  async update(@Param("id") id: number, @Body() updateGameDto: UpdateGameDto) {
    let game = await this.gameService.findOne(id);
    if (!game) {
      throw new NotFoundException();
    }
    const updated = await this.gameService.update(+id, updateGameDto);
    if (updated.affected < 0) {
      return game;
    }
    game = await this.gameService.findOne(id);
    return game;
  }
}
