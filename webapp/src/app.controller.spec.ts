import { Test, TestingModule } from "@nestjs/testing";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

describe("AppController", () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe("root", () => {
    it("should return 37 tiles", () => {
      expect(appController.root()).toStrictEqual({
        game: [
          [
            null,
            null,
            null,
            { color: "cyan", symbol: "B" },
            { color: "green", symbol: "A" },
            { color: "cyan", symbol: "D" },
            { color: "red", symbol: "A" },
            null,
            null,
            null,
          ],
          [
            null,
            null,
            { color: "magenta", playedBy: "white", symbol: "E" },
            { color: "blue", playedBy: "white", symbol: "F" },
            { color: "green", playedBy: "white", symbol: "C" },
            {
              color: "green",
              lastPlayed: false,
              playedBy: "black",
              symbol: "E",
            },
            {
              color: "green",
              lastPlayed: true,
              playedBy: "black",
              symbol: "D",
            },
            null,
            null,
          ],
          [
            null,
            { color: "cyan", symbol: "C" },
            { color: "blue", symbol: "D" },
            { color: "yellow", symbol: "C" },
            {
              color: "yellow",
              lastPlayed: false,
              playedBy: "black",
              symbol: "B",
            },
            { color: "blue", symbol: "B" },
            { color: "cyan", symbol: "A" },
            null,
          ],
          [
            { color: "red", symbol: "D" },
            { color: "cyan", symbol: "F" },
            { color: "red", symbol: "B" },
            {
              color: "magenta",
              lastPlayed: false,
              playedBy: "black",
              symbol: "C",
            },
            { color: "yellow", symbol: "E" },
            { color: "grey", lastPlayed: false, playedBy: null, symbol: "O" },
            { color: "yellow", symbol: "A" },
          ],
          [
            null,
            { color: "yellow", symbol: "F" },
            { color: "red", symbol: "E" },
            {
              color: "blue",
              lastPlayed: false,
              playedBy: "black",
              symbol: "E",
            },
            { color: "green", symbol: "F" },
            { color: "yellow", symbol: "D" },
            { color: "magenta", symbol: "F" },
            null,
          ],
          [
            null,
            null,
            {
              color: "blue",
              lastPlayed: false,
              playedBy: "black",
              symbol: "A",
            },
            {
              color: "magenta",
              lastPlayed: false,
              playedBy: "black",
              symbol: "D",
            },
            { color: "magenta", symbol: "A" },
            { color: "magenta", symbol: "B" },
            { color: "green", symbol: "B" },
            null,
            null,
          ],
          [
            null,
            null,
            null,
            { color: "blue", symbol: "C" },
            { color: "cyan", symbol: "E" },
            { color: "red", symbol: "F" },
            { color: "red", symbol: "C" },
            null,
            null,
            null,
          ],
        ],
      });
    });
  });
});
