import { Test, TestingModule } from "@nestjs/testing";
import { ApiController } from "./api.controller";
import { GameModule } from "../game/game.module";
import { EventsService } from "../events.service";
import { AppModule } from "../app.module";

describe("ApiController", () => {
  let controller: ApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApiController],
      imports: [GameModule, AppModule],
      providers: [EventsService],
    }).compile();

    controller = module.get<ApiController>(ApiController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
