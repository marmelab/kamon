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
import { UsersService } from "src/users/users.service";
import { LocalAuthGuard } from "./local-auth.guard";

@Controller("/auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Get("/register")
  @Render("userForm")
  registerView() {
    return { action: "/auth/register", title: "Register" };
  }

  @Post("/register")
  @Redirect("/auth/login")
  async register(@Body() body) {
    try {
      await this.userService.createUser(body.username, body.password);
    } catch (error) {
      return { url: "/auth/register" };
    }
  }

  @Get("/login")
  @Render("userForm")
  signView() {
    return { action: "/auth/login", title: "Login" };
  }

  @UseGuards(LocalAuthGuard)
  @Post("/login")
  @Redirect("/me")
  login(@Request() req) {
    return req.user;
  }

  @Get("/logout")
  @Redirect("/auth/login")
  logout(@Session() session) {
    session.destroy();
  }
}
