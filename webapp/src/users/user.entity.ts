import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  constructor(username: string, password: string) {
    this.username = username;
  }

  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ nullable: true, unique: true })
  @ApiProperty()
  username: string;

  @Column()
  @ApiProperty()
  password: string;
}
