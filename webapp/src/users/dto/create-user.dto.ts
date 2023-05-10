import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({
    description: "The username",
  })
  username: string;

  @ApiProperty()
  password: string;
}
