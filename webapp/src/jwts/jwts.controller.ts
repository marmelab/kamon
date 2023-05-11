import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { JwtsService } from "./jwts.service";
import { CreateJwtDto } from "./dto/create-jwt.dto";
import { UpdateJwtDto } from "./dto/update-jwt.dto";
import { ApiExcludeController } from "@nestjs/swagger";

@Controller("jwts")
@ApiExcludeController()
export class JwtsController {
  constructor(private readonly jwtsService: JwtsService) {}

  @Post()
  create(@Body() createJwtDto: CreateJwtDto) {
    return this.jwtsService.create(createJwtDto);
  }

  @Get()
  findAll() {
    return this.jwtsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.jwtsService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateJwtDto: UpdateJwtDto) {
    return this.jwtsService.update(+id, updateJwtDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.jwtsService.remove(+id);
  }
}
