import { Controller, Get, Render } from "@nestjs/common";
@Controller()
export class AppController {
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
            highlighted: true,
          },
          {
            symbol: "A",
            color: "red",
            highlighted: true,
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
            highlighted: true,
          },
          {
            symbol: "D",
            color: "green",
            playedBy: "black",
            lastPlayed: true,
            highlighted: true,
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
            highlighted: true,
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
}
