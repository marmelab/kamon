import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Game } from "./game.entity";
import { initGameState, initRandomGame, Board, GameState } from "@kamon/core";

export class GameService {
  games: Repository<Game>;

  constructor(
    @InjectRepository(Game)
    gameRepository: Repository<Game>,
  ) {
    this.games = gameRepository;
  }

  findAll(): Promise<Game[]> {
    return this.games.find();
  }

  findOne(id: number): Promise<Game | null> {
    return this.games.findOneBy({ id });
  }

  async updateBoard(id: number, board: Board): Promise<Game | null> {
    const foundGame = await this.games.findOneBy({ id });
    if (foundGame == null) return;

    foundGame.board = board;
    this.games.save(foundGame);

    return foundGame;
  }

  async updateGameState(
    id: number,
    gameState: GameState,
  ): Promise<Game | null> {
    const foundGame = await this.games.findOneBy({ id });
    if (foundGame == null) return;

    foundGame.gameState = gameState;
    this.games.save(foundGame);

    return foundGame;
  }

  createGame(): Promise<Game | null> {
    return this.games.save({
      board: initRandomGame(),
      gameState: initGameState(),
    });
  }

  async remove(id: number): Promise<void> {
    await this.games.delete(id);
  }
}
