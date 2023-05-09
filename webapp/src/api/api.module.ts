import { Module } from "@nestjs/common";
import { ApiController } from "./api.controller";
import { GameModule } from "../game/game.module";
import { EventsService } from "../events.service";

@Module({
  controllers: [ApiController],
  imports: [GameModule],
  providers: [EventsService],
})
export class ApiModule {}
