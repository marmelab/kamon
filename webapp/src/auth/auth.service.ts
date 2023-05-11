import { Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as argon2 from "argon2";
import { UsersService } from "../users/users.service";
import { JwtsService } from "../jwts/jwts.service";
import { User } from "../users/user.entity";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private jwtsService: JwtsService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUserName(username);

    if (!user) {
      throw new NotFoundException();
    }

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
    const access_token = await this.jwtService.signAsync(payload);
    const jwt: any = this.jwtService.decode(access_token);

    const oldJwt = await this.jwtsService.findOneByUser(user);

    if (oldJwt) {
      this.jwtsService.update(oldJwt.id, {
        token: access_token,
        iat: jwt.iat,
        exp: jwt.exp,
        user: user,
        isActive: true,
      });
    } else {
      this.jwtsService.create({
        token: access_token,
        iat: jwt.iat,
        exp: jwt.exp,
        user: user,
      });
    }

    return {
      access_token,
    };
  }

  async logout(user: User) {
    const jwt = await this.jwtsService.findOneByUser(user);
    return this.jwtsService.update(jwt.id, { ...jwt, isActive: false });
  }
}
