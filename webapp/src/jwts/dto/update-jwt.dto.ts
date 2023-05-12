import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateJwtDto } from "./create-jwt.dto";

export class UpdateJwtDto extends PartialType(CreateJwtDto) {
  @ApiProperty()
  isActive: boolean;
}
