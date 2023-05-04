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
      const result = appController.root(
        '{"state":{"currentPlayer":"white","isRunning":true,"winner":null,"isDraw":false,"turnNumber":3,"message":"WHITE, your turn"},"board":[[null,null,null,{"symbol":"A","color":"yellow","moveAllowed":false},{"symbol":"C","color":"blue","moveAllowed":false},{"symbol":"F","color":"red","moveAllowed":false},{"symbol":"D","color":"magenta","moveAllowed":false},null,null,null],[null,null,{"symbol":"A","color":"green","playedBy":"black","lastPlayed":false,"moveAllowed":false},{"symbol":"C","color":"green","moveAllowed":true},{"symbol":"A","color":"blue","moveAllowed":false},{"symbol":"E","color":"magenta","moveAllowed":false},{"symbol":"E","color":"green","moveAllowed":true},null,null],[null,{"symbol":"A","color":"red","moveAllowed":false},{"symbol":"E","color":"cyan","moveAllowed":false},{"symbol":"C","color":"yellow","moveAllowed":false},{"symbol":"D","color":"green","moveAllowed":true},{"symbol":"D","color":"yellow","moveAllowed":false},{"symbol":"E","color":"blue","moveAllowed":false},null],[{"symbol":"B","color":"red","moveAllowed":true},{"symbol":"C","color":"magenta","moveAllowed":false},{"symbol":"F","color":"magenta","moveAllowed":false},{"symbol":"C","color":"cyan","moveAllowed":false},{"symbol":"E","color":"red","moveAllowed":false},{"symbol":"A","color":"cyan","moveAllowed":false},{"symbol":"D","color":"cyan","moveAllowed":false}],[null,{"symbol":"F","color":"green","moveAllowed":false,"playedBy":"white","lastPlayed":false},{"symbol":"B","color":"yellow","moveAllowed":true},{"symbol":"F","color":"blue","moveAllowed":false},{"symbol":"A","color":"magenta","moveAllowed":false},{"symbol":"B","color":"magenta","moveAllowed":true},{"symbol":"B","color":"green","moveAllowed":false,"playedBy":"black","lastPlayed":true}],[null,null,{"symbol":"O","color":"grey","playedBy":null,"lastPlayed":false,"moveAllowed":false},{"symbol":"C","color":"red","moveAllowed":false},{"symbol":"E","color":"yellow","moveAllowed":false},{"symbol":"B","color":"cyan","moveAllowed":true},{"symbol":"D","color":"red","moveAllowed":false}],[null,null,null,{"symbol":"B","color":"blue","moveAllowed":true},{"symbol":"F","color":"cyan","moveAllowed":false},{"symbol":"F","color":"yellow","moveAllowed":false},{"symbol":"D","color":"blue","moveAllowed":false}]]}',
      );
      expect(result).toStrictEqual({
        game: {
          state: {
            currentPlayer: "white",
            isRunning: true,
            winner: null,
            isDraw: false,
            turnNumber: 3,
            message: "WHITE, your turn",
          },
          board: [
            [
              null,
              null,
              null,
              { symbol: "A", color: "yellow", moveAllowed: false },
              { symbol: "C", color: "blue", moveAllowed: false },
              { symbol: "F", color: "red", moveAllowed: false },
              { symbol: "D", color: "magenta", moveAllowed: false },
              null,
              null,
              null,
            ],
            [
              null,
              null,
              {
                symbol: "A",
                color: "green",
                playedBy: "black",
                lastPlayed: false,
                moveAllowed: false,
              },
              { symbol: "C", color: "green", moveAllowed: true },
              { symbol: "A", color: "blue", moveAllowed: false },
              { symbol: "E", color: "magenta", moveAllowed: false },
              { symbol: "E", color: "green", moveAllowed: true },
              null,
              null,
            ],
            [
              null,
              { symbol: "A", color: "red", moveAllowed: false },
              { symbol: "E", color: "cyan", moveAllowed: false },
              { symbol: "C", color: "yellow", moveAllowed: false },
              { symbol: "D", color: "green", moveAllowed: true },
              { symbol: "D", color: "yellow", moveAllowed: false },
              { symbol: "E", color: "blue", moveAllowed: false },
              null,
            ],
            [
              { symbol: "B", color: "red", moveAllowed: true },
              { symbol: "C", color: "magenta", moveAllowed: false },
              { symbol: "F", color: "magenta", moveAllowed: false },
              { symbol: "C", color: "cyan", moveAllowed: false },
              { symbol: "E", color: "red", moveAllowed: false },
              { symbol: "A", color: "cyan", moveAllowed: false },
              { symbol: "D", color: "cyan", moveAllowed: false },
            ],
            [
              null,
              {
                symbol: "F",
                color: "green",
                moveAllowed: false,
                playedBy: "white",
                lastPlayed: false,
              },
              { symbol: "B", color: "yellow", moveAllowed: true },
              { symbol: "F", color: "blue", moveAllowed: false },
              { symbol: "A", color: "magenta", moveAllowed: false },
              { symbol: "B", color: "magenta", moveAllowed: true },
              {
                symbol: "B",
                color: "green",
                moveAllowed: false,
                playedBy: "black",
                lastPlayed: true,
              },
            ],
            [
              null,
              null,
              {
                symbol: "O",
                color: "grey",
                playedBy: null,
                lastPlayed: false,
                moveAllowed: false,
              },
              { symbol: "C", color: "red", moveAllowed: false },
              { symbol: "E", color: "yellow", moveAllowed: false },
              { symbol: "B", color: "cyan", moveAllowed: true },
              { symbol: "D", color: "red", moveAllowed: false },
            ],
            [
              null,
              null,
              null,
              { symbol: "B", color: "blue", moveAllowed: true },
              { symbol: "F", color: "cyan", moveAllowed: false },
              { symbol: "F", color: "yellow", moveAllowed: false },
              { symbol: "D", color: "blue", moveAllowed: false },
            ],
          ],
        },
      });
    });
  });
});
