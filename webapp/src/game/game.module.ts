import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Game } from "./game.entity";
import { GameService } from "./game.service";
import { GameController } from "./game.controller";
import { User } from "../users/user.entity";
import { EventsService } from "../events.service";
import { JwtsModule } from "../jwts/jwts.module";

@Module({
  imports: [
    JwtsModule,
    TypeOrmModule.forFeature([Game]),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [GameController],
  providers: [GameService, EventsService],
  exports: [GameService],
})
export class GameModule {}
