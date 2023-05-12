import { ApiProperty } from "@nestjs/swagger";
import { Jwt } from "../jwts/jwt.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

  @OneToMany(() => Jwt, (jwt) => jwt.user)
  jwts: Jwt[];
}
