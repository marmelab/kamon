import {
  Body,
  Controller,
  Headers,
  Post,
  Res,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UsersService } from "../users/users.service";
import { ApiCreatedResponse, ApiExcludeController } from "@nestjs/swagger";
import { LocalAuthGuard } from "./local-auth.guard";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import * as argon2 from "argon2";
import { Response } from "express";

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
