import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  Request,
  Res,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UsersService } from "../users/users.service";
import { ApiCreatedResponse } from "@nestjs/swagger";
import { LocalAuthGuard } from "./local-auth.guard";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import * as argon2 from "argon2";
import { Response } from "express";
import { JwtAuthGuard } from "./jwt-auth.guard";

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post("login")
  @ApiCreatedResponse({
    description: "If credentials are ok, get a JWT",
  })
  async signIn(
    @Body() signInDto: CreateUserDto,
    @Headers() headers,
    @Res() response: Response,
  ) {
    const token = await this.authService.login(signInDto.username);

    if (headers?.accept && headers.accept === "application/json") {
      return response.send(token);
    }

    response.cookie("jwt", token.access_token, {
      httpOnly: true,
      secure: true,
    });
    return response.redirect("/me");
  }

  @Post("/register")
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

  @UseGuards(JwtAuthGuard)
  @Get("/logout")
  async logout(@Request() request, @Res() response: Response) {
    response.cookie("jwt", "");
    const user = await this.userService.findOne(request.user.sub);
    this.authService.logout(user);
    return response.send("logout");
  }
}
