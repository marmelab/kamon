import { PartialType } from "@nestjs/mapped-types";
import { CreateGameDto } from "./create-game.dto";
import { ApiProperty } from "@nestjs/swagger";
import { Board, GameState, PlayableTile } from "@kamon/core/dist";

export class UpdateGameDto extends PartialType(CreateGameDto) {
  /*@ApiProperty({
    description: "The board with all tiles",
    type: "array",
    items: {
      type: "array",
      description: "The tiles",
      items: {
        type: "object",
        properties: {
          color: {
            type: "string",
            example: "yellow",
          },
          symbol: {
            type: "string",
            example: "A",
          },
          moveAllowed: {
            type: "boolean",
          },
          playedBy: {
            type: "string",
            example: "black",
          },
          lastPlayed: {
            type: "boolean",
          },
        },
      },
    },
  })
  board: Board;

  @ApiProperty({
    description: "The state of the game",
  })
  gameState: GameState;*/

  @ApiProperty({
    description: "The tile that has been played",
    type: "string",
    example: "A-yellow",
  })
  played: string;
}
