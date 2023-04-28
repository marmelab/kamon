import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { Game } from "src/game/game.entity";

// This should be a real class/interface representing a user entity

@Injectable()
export class UsersService {
  userRepository: Repository<User>;

  constructor(
    @InjectRepository(User)
    userRepository: Repository<User>,
  ) {
    this.userRepository = userRepository;
  }

  async findOne(id: number): Promise<User | undefined> {
    return this.userRepository.findOneBy({ id });
  }

  async createUser(username: string, password: string): Promise<User | null> {
    return this.userRepository.save({
      username,
      password,
    });
  }

  async findByUserName(username: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ username });
  }

  async findMyGame(id: number): Promise<User[] | undefined> {
    return this.userRepository
      .createQueryBuilder()
      .select("g")
      .from(Game, "g")
      .addFrom(User, "u")
      .andWhere("g.player_black = :id")
      .orWhere("g.player_white = :id")
      .setParameter("id", id)
      .getMany();
  }
}
