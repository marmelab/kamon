import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Board } from "@kamon/core";
import { GameState } from "@kamon/core";
import { User } from "../users/user.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column("jsonb")
  @ApiProperty({
    description: "The board with all tiles",
    type: "array",
    items: {
      type: "array",
      description: "The tiles",
      items: {
        type: "object",
        properties: {
          color: {
            type: "string",
            example: "yellow",
          },
          symbol: {
            type: "string",
            example: "A",
          },
          moveAllowed: {
            type: "boolean",
          },
          playedBy: {
            type: "string",
            example: "black",
          },
          lastPlayed: {
            type: "boolean",
          },
        },
      },
    },
  })
  board: Board;

  @Column("jsonb")
  @ApiProperty({
    description: "The state of the game",
    type: "object",
    properties: {
      isDraw: {
        type: "boolean",
      },
      winner: {
        type: "string",
        example: "black",
      },
      message: {
        type: "string",
        example:
          "Hey budy, are you trying to play on a played tile ?! 🤔 Please player BLACK choose an non played tile",
      },
      isRunning: {
        type: "boolean",
      },
      turnNumber: {
        type: "number",
        example: 27,
      },
      currentPlayer: {
        type: "string",
        example: "black",
      },
      remainingTiles: {
        type: "object",
        properties: {
          black: {
            type: "number",
            example: 4,
          },
          while: {
            type: "number",
            example: 5,
          },
        },
      },
    },
  })
  gameState: GameState;

  @ManyToOne(() => User, { nullable: true, eager: true, onDelete: "CASCADE" })
  player_black: User;

  @ManyToOne(() => User, { nullable: true, eager: true, onDelete: "CASCADE" })
  player_white: User;

  @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  @ApiProperty()
  createdAt: Date;

  @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  @ApiProperty()
  updatedAt: Date;

  @Column({ type: "boolean", default: false, nullable: true })
  @ApiProperty()
  isSolo: boolean;
}
