import { PartialType } from "@nestjs/mapped-types";
import { CreateGameDto } from "./create-game.dto";
import { ApiProperty } from "@nestjs/swagger";
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
    description: "The coordinates (x-y) of the tile that has been played",
    type: "string",
    example: "0-3",
  })
  played: string;
}
