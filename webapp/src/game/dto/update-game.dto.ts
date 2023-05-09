import { PartialType } from "@nestjs/mapped-types";
import { CreateGameDto } from "./create-game.dto";
import { ApiProperty } from "@nestjs/swagger";
export class UpdateGameDto extends PartialType(CreateGameDto) {
  @ApiProperty({
    description: "The coordinates (x-y) of the tile that has been played",
    type: "string",
    example: "0-3",
  })
  played: string;
}
