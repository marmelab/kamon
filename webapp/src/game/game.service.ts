import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Game } from "./game.entity";
import { initGameState, initRandomGame, Board, GameState } from "@kamon/core";

export class GameService {
  gameRepository: Repository<Game>;

  constructor(
    @InjectRepository(Game)
    gameRepository: Repository<Game>,
  ) {
    this.gameRepository = gameRepository;
  }

  findAll(): Promise<Game[]> {
    return this.gameRepository.find();
  }

  findOne(id: number): Promise<Game | null> {
    return this.gameRepository.findOneBy({ id });
  }

  async updateBoard(id: number, board: Board): Promise<Game | null> {
    const foundGame = await this.gameRepository.findOneBy({ id });
    if (foundGame == null) return;

    foundGame.board = board;
    this.gameRepository.save(foundGame);

    return foundGame;
  }

  async updateGameState(
    id: number,
    gameState: GameState,
  ): Promise<Game | null> {
    const foundGame = await this.gameRepository.findOneBy({ id });
    if (foundGame == null) return;

    foundGame.gameState = gameState;
    this.gameRepository.save(foundGame);

    return foundGame;
  }

  createGame(): Promise<Game | null> {
    return this.gameRepository.save({
      board: initRandomGame(),
      gameState: initGameState(),
    });
  }

  async remove(id: number): Promise<void> {
    await this.gameRepository.delete(id);
  }
}
