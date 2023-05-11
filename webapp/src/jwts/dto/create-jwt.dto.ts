import { ApiProperty } from "@nestjs/swagger";
import { User } from "../../users/user.entity";

export class CreateJwtDto {
  @ApiProperty()
  token: string;

  @ApiProperty()
  iat: number;

  @ApiProperty()
  exp: number;

  @ApiProperty()
  user: User;
}
