import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as argon2 from "argon2";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUserName(username);

    const isPasswordOk = await argon2.verify(user.password, password);

    if (user && isPasswordOk) {
      const { password, ...rest } = user;
      return rest;
    }

    return null;
  }

  async login(username) {
    const user = await this.usersService.findByUserName(username);
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
