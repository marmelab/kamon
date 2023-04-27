import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Board } from "@kamon/core";
import { GameState } from "@kamon/core";
import { User } from "../user/user.entity";

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("jsonb")
  board: Board;

  @Column("jsonb")
  gameState: GameState;

  @ManyToOne(() => User, { nullable: true })
  player_black: User;

  @ManyToOne(() => User, { nullable: true })
  player_white: User;
}
