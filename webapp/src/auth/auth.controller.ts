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

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Get("/")
  @Render("userForm")
  registerView() {
    return { action: "/register", title: "Register" };
  }

  @Post("/register")
  @Redirect("/login")
  async register(@Body() body) {
    try {
      await this.userService.createUser(body.username, body.password);
    } catch (error) {
      return { url: "/register" };
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
}
