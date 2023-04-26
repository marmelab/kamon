import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Redirect,
  Render,
  Req,
} from "@nestjs/common";
@Controller()
export class AppController {
  @Get("/")
  @Render("index")
  root(@Req() req: Request, @Query("game-state") gameState) {
    let board;
    if (gameState) {
      gameState = JSON.parse(gameState);
      board = JSON.parse(gameState.board);
    } else {
      board = [
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
      ];
    }

    return {
      board,
    };
  }

  @Post("/")
  @Redirect("/")
  postGame(@Req() req: Request, @Body() gameState) {
    // TODO: update the game state
    gameState = JSON.parse(JSON.stringify(gameState));
    const played = gameState.played;
    console.log(gameState);
    return { url: `/?game-state=${JSON.stringify(gameState)}` };
  }
}
