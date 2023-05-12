import { Controller, Get, Request, UseGuards } from "@nestjs/common";
import { ApiExcludeController } from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller()
@ApiExcludeController()
export class UserController {
  constructor(private userService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get("/me")
  me(@Request() req) {
    return req.user;
  }
}
