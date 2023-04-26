import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { Board } from "@kamon/core/src/board/board";
import { GameState } from "@kamon/core/src/game/state";

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("jsonb")
  board: Board;

  @Column("jsonb")
  gameState: GameState;
}
