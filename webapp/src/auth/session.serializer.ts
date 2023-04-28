import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { UsersService } from "src/users/users.service";

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private usersService: UsersService) {
    super();
  }

  serializeUser(user: any, done: Function) {
    done(null, { id: user.id });
  }

  deserializeUser(payload: any, done: Function) {
    const user = this.usersService.findOne(payload.id);
    done(null, user);
  }
}
