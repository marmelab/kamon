import { Board, GameState } from "@kamon/core/dist";
import { ApiProperty } from "@nestjs/swagger";

export class CreateGameDto {
  @ApiProperty()
  board: Board;
}
