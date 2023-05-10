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
import { CreateUserDto } from "src/users/dto/create-user.dto";
import * as argon2 from "argon2";

@Controller()
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

  /*@Post("/")
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
  }*/

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
    return this.authService.login(signInDto.username);
  }

  @Post("/auth/register")
  async register(@Body() createUserDto: CreateUserDto) {
    const alreadyExistingUser = await this.userService.findByUserName(
      createUserDto.username,
    );

    if (alreadyExistingUser) {
      return {
        error: "Account already exist",
      };
    }

    try {
      createUserDto.password = await argon2.hash(createUserDto.password);
    } catch (error) {
      return {
        error,
      };
    }

    const user = await this.userService.createUser(
      createUserDto.username,
      createUserDto.password,
    );

    const { password, ...rest } = user;

    return rest;
  }
}
