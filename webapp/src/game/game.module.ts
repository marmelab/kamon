import { MiddlewareConsumer, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Game } from "./game.entity";
import { GameService } from "./game.service";
import { GameController } from "./game.controller";
import { User } from "../user/user.entity";
import { EventsService } from "src/events.service";

@Module({
  imports: [TypeOrmModule.forFeature([Game]), TypeOrmModule.forFeature([User])],
  controllers: [GameController],
  providers: [GameService, EventsService],
  exports: [GameService],
})
export class GameModule {}
