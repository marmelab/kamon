import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Render,
  Req,
  Res,
  Body,
} from "@nestjs/common";
import { Request, Response } from "express";
import { GameService } from "./game.service";
import { GameResponseTemplate } from "./game.template";
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
  findTile,
} from "@kamon/core";

@Controller()
export class GameController {
  constructor(private gameService: GameService) {}

  @Get("/")
  @Render("launchGamePage")
  async launchGame(
    @Res() response: Response,
    @Req() request: Request,
  ): Promise<void> {}

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
  @Render("index")
  async renderGame(
    @Param("gameId", ParseIntPipe) gameId: number,
  ): Promise<GameResponseTemplate> {
    const foundGame = await this.gameService.findOne(gameId);

    const board = highlightAllowedTiles(foundGame.board, foundGame.gameState);

    const updatedGame = await this.gameService.updateBoard(foundGame.id, board);
    return { game: updatedGame };
  }

  @Post("/game/:gameId")
  async updateGame(
    @Param("gameId", ParseIntPipe) gameId: number,
    @Res() response: Response,
    @Req() req: Request,
    @Body() body,
  ): Promise<void> {
    const foundGame = await this.gameService.findOne(gameId);

    let board = JSON.parse(body["board"]);
    let state = JSON.parse(body["state"]);
    const [color, symbol] = body["played"].split("-");

    const { gameState, allowedMove } = checkUserMove(
      board,
      { value: { symbol, color } },
      state,
    );

    state = gameState;

    if (!allowedMove) {
      await this.gameService.updateBoard(foundGame.id, board);
      await this.gameService.updateGameState(foundGame.id, state);
      return response.redirect(`/game/${JSON.stringify(foundGame.id)}`);
    }

    state.turnNumber += 1;
    state = updateRemainingTiles(state);

    board = updateBoardState(board, { symbol, color }, state);

    if (checkIfDraw(state)) {
      state = setGameAsDraw(state);
      await this.gameService.updateBoard(foundGame.id, board);
      await this.gameService.updateGameState(foundGame.id, state);
      return response.redirect(`/game/${JSON.stringify(foundGame.id)}`);
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
      await this.gameService.updateBoard(foundGame.id, board);
      await this.gameService.updateGameState(foundGame.id, state);
      return response.redirect(`/game/${JSON.stringify(foundGame.id)}`);
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

    await this.gameService.updateBoard(foundGame.id, board);
    await this.gameService.updateGameState(foundGame.id, state);
    return response.redirect(`/game/${JSON.stringify(foundGame.id)}`);
  }
}
