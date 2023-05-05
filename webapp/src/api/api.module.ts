import { Module } from "@nestjs/common";
import { ApiController } from "./api.controller";
import { GameModule } from "src/game/game.module";
import { EventsService } from "src/events.service";

@Module({
  controllers: [ApiController],
  imports: [GameModule],
  providers: [EventsService],
})
export class ApiModule {}
