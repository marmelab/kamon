import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Request } from "express";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalAuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();
    const user = await this.authService.validateUser(
      request.body.username,
      request.body.password,
    );

    if (!user) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
