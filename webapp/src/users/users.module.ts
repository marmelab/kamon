import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { UserController } from "./user.contoller";
import { JwtsModule } from "../jwts/jwts.module";

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtsModule],
  controllers: [UserController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
