import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Redirect,
  Render,
  Req,
} from "@nestjs/common";
import {
  initRandomGame,
  initGameState,
  updateBoardState,
  checkIfDraw,
  setGameAsDraw,
  checkUserMove,
  updateGraphState,
  highlightAllowedTiles,
  getOppositePath,
  switchPlayer,
  checkIfGameWon,
  winGame,
} from "@kamon/core";

@Controller()
export class AppController {
  getStateUrl(state, board) {
    return { url: `/?game-state=${JSON.stringify({ state, board })}` };
  }

  @Get("/game/example")
  @Render("index")
  root() {
    const game = {
      gameState: {
        currentPlayer: "white",
        isRunning: true,
        winner: "white",
        isDraw: false,
        turnNumber: 2,
        remainingTiles: {
          black: 17,
          white: 18,
        },
        message: "Welcome to Kamon 🍱 ! Black player, you turn",
      },
      board: [
        [
          null,
          null,
          null,
          {
            symbol: "B",
            color: "cyan",
          },
          {
            symbol: "A",
            color: "green",
          },
          {
            symbol: "D",
            color: "cyan",
          },
          {
            symbol: "A",
            color: "red",
          },
          null,
          null,
          null,
        ],
        [
          null,
          null,
          {
            symbol: "E",
            color: "magenta",
            playedBy: "white",
          },
          {
            symbol: "F",
            color: "blue",
            playedBy: "white",
          },
          {
            symbol: "C",
            color: "green",
            playedBy: "white",
          },
          {
            symbol: "E",
            color: "green",
            playedBy: "black",
            lastPlayed: false,
          },
          {
            symbol: "D",
            color: "green",
            playedBy: "black",
            lastPlayed: true,
          },
          null,
          null,
        ],
        [
          null,
          {
            symbol: "C",
            color: "cyan",
          },
          {
            symbol: "D",
            color: "blue",
          },
          {
            symbol: "C",
            color: "yellow",
          },
          {
            symbol: "B",
            color: "yellow",
            playedBy: "black",
            lastPlayed: false,
          },
          {
            symbol: "B",
            color: "blue",
          },
          {
            symbol: "A",
            color: "cyan",
          },
          null,
        ],
        [
          {
            symbol: "D",
            color: "red",
          },
          {
            symbol: "F",
            color: "cyan",
          },
          {
            symbol: "B",
            color: "red",
          },
          {
            symbol: "C",
            color: "magenta",
            playedBy: "black",
            lastPlayed: false,
          },
          {
            symbol: "E",
            color: "yellow",
          },
          {
            symbol: "O",
            color: "grey",
            playedBy: null,
            lastPlayed: false,
          },
          {
            symbol: "A",
            color: "yellow",
          },
        ],
        [
          null,
          {
            symbol: "F",
            color: "yellow",
          },
          {
            symbol: "E",
            color: "red",
          },
          {
            symbol: "E",
            color: "blue",
            playedBy: "black",
            lastPlayed: false,
          },
          {
            symbol: "F",
            color: "green",
          },
          {
            symbol: "D",
            color: "yellow",
          },
          {
            symbol: "F",
            color: "magenta",
          },
          null,
        ],
        [
          null,
          null,
          {
            symbol: "A",
            color: "blue",
            playedBy: "black",
            lastPlayed: false,
          },
          {
            symbol: "D",
            color: "magenta",
            playedBy: "black",
            lastPlayed: false,
          },
          {
            symbol: "A",
            color: "magenta",
          },
          {
            symbol: "B",
            color: "magenta",
          },
          {
            symbol: "B",
            color: "green",
          },
          null,
          null,
        ],
        [
          null,
          null,
          null,
          {
            symbol: "C",
            color: "blue",
          },
          {
            symbol: "E",
            color: "cyan",
          },
          {
            symbol: "F",
            color: "red",
          },
          {
            symbol: "C",
            color: "red",
          },
          null,
          null,
          null,
        ],
      ],
    };
    return {
      game,
    };
  }

  @Post("/game/example")
  @Redirect("/game/example")
  postGame(@Req() req: Request, @Body() body) {
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
      return this.getStateUrl(state, board);
    }

    state.turnNumber += 1;

    board = updateBoardState(board, { symbol, color }, state);

    if (checkIfDraw(state)) {
      state = setGameAsDraw(state);
      return this.getStateUrl(state, board);
    }

    const previousPlayer = state.currentPlayer;
    const graph = updateGraphState(state.currentPlayer, board);

    board = highlightAllowedTiles(board, state);

    if (getOppositePath(graph).length > 0) {
      state = {
        ...state,
        message: `!!!!!! ${state.currentPlayer.toUpperCase()} WON 🥳 !!!!!!`,
        winner: state.currentPlayer,
        isRunning: false,
      };
      return this.getStateUrl(state, board);
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

    return this.getStateUrl(state, board);
  }
}
