import { Game } from "src/game/game.entity";
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class User {
  constructor(username: string, password: string) {
    this.username = username;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, unique: true })
  username: string;

  @Column()
  password: string;
}
