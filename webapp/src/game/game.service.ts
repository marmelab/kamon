import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Game } from "./game.entity";
import { initGameState } from "@kamon/core";
import { initRandomGame } from "@kamon/core";

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
