import { Controller, Get, Render, Session, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { AuthenticatedGuard } from "src/auth/authenticated.guard";

@Controller()
export class UserController {
  constructor(private userService: UsersService) {}

  @Get("/me")
  @UseGuards(AuthenticatedGuard)
  @Render("me")
  async me(@Session() session) {
    const games = await this.userService.findMyGame(session.passport.user.id);
    console.log(games);
    return { games, userId: session.passport.user.id };
  }
}