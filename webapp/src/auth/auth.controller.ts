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
import { LocalAuthGuard } from "./local-auth.guard";
import { ApiExcludeController } from "@nestjs/swagger";
import { JwtAuthGuard } from "./jwt-auth.guard";

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

  @UseGuards(LocalAuthGuard)
  @Post("/login")
  @Redirect("/me")
  login(@Request() req) {
    return req.user;
  }

  @Get("/logout")
  @Redirect("/login")
  logout(@Session() session) {
    session.destroy();
  }

  @Post("/jwt")
  jwt(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get("/profile")
  getProfile(@Request() req) {
    return req.user;
  }
}
