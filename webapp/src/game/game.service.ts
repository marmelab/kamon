import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Game } from "./game.entity";
import {
  initGameState,
  initRandomGame,
  Board,
  GameState,
  highlightAllowedTiles,
} from "@kamon/core";
import { UpdateGameDto } from "./dto/update-game.dto";
import { User } from "../users/user.entity";

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
    await this.gameRepository.save(foundGame);

    return foundGame;
  }

  async updateGameState(
    id: number,
    gameState: GameState,
  ): Promise<Game | null> {
    const foundGame = await this.gameRepository.findOneBy({ id });
    if (foundGame == null) return;

    foundGame.gameState = gameState;
    await this.gameRepository.save(foundGame);

    return foundGame;
  }

  createGame(user: User): Promise<Game | null> {
    const gameState = initGameState();
    const board = highlightAllowedTiles(initRandomGame(), gameState);
    return this.gameRepository.save({
      board,
      gameState,
      player_black: user,
    });
  }

  async remove(id: number): Promise<void> {
    await this.gameRepository.delete(id);
  }

  findOnGoing() {
    return this.gameRepository
      .createQueryBuilder("g")
      .andWhere("g.gameState ::jsonb @> :state")
      .setParameter("state", { isRunning: true })
      .orderBy("id", "DESC")
      .getMany();
  }

  async makeRun(id: number) {
    const game = await this.findOne(id);
    const gameState = { ...game.gameState, isRunning: true };
    return this.gameRepository.update(id, { ...game, gameState });
  }

  async makeStop(id: number) {
    const game = await this.findOne(id);
    const gameState = { ...game.gameState, isRunning: false };
    return this.gameRepository.update(id, { ...game, gameState });
  }

  async setWhitePlayer(id: number, player: User) {
    const game = await this.findOne(id);
    return this.gameRepository.update(id, { ...game, player_white: player });
  }

  async setBlackPlayer(id: number, player: User) {
    const game = await this.findOne(id);
    return this.gameRepository.update(id, { ...game, player_black: player });
  }

  checkGameBelongToPlayer(game: Game, player: User) {
    return (
      player.id === game.player_black.id || player.id === game.player_white.id
    );
  }

  checkPlayerTurn(game: Game, player: User) {
    return (
      (game.gameState.currentPlayer === "black" &&
        player.id === game.player_black.id) ||
      (game.gameState.currentPlayer === "white" &&
        player.id === game.player_white.id)
    );
  }

  checkPlayableGame(game: Game, player: User) {
    return (
      this.checkGameBelongToPlayer(game, player) &&
      this.checkPlayerTurn(game, player) &&
      game.gameState.isRunning
    );
  }
}
