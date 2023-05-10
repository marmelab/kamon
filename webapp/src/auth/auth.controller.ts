import {
  Body,
  Controller,
  Get,
  Post,
  Redirect,
  Render,
  Request,
  Session,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UsersService } from "../users/users.service";
import { ApiExcludeController } from "@nestjs/swagger";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { LocalAuthGuard } from "./local-auth.guard";

@Controller()
@ApiExcludeController()
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Get("/")
  @Render("userForm")
  registerView() {
    return { action: "/", title: "Register" };
  }

  @Post("/")
  @Redirect("/login")
  async register(@Body() body) {
    try {
      const alreadyExistingUser = this.userService.findByUserName(
        body.username,
      );

      if (alreadyExistingUser) {
        return { url: "/" };
      }

      await this.userService.createUser(body.username, body.password);
    } catch (error) {
      return { url: "/" };
    }
  }

  @Get("/login")
  @Render("userForm")
  signView() {
    return { action: "/login", title: "Login" };
  }

  @UseGuards(JwtAuthGuard)
  @Get("/me")
  me(@Request() req) {
    return req.user;
  }

  @Get("/logout")
  @Redirect("/login")
  logout(@Session() session) {
    session.destroy();
  }

  @UseGuards(LocalAuthGuard)
  @Post("login")
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }
}
