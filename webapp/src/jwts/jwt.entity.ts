import { User } from "../users/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Jwt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  iat: number;

  @Column()
  exp: number;

  @ManyToOne((type) => User, (user) => user.jwts)
  user: User;
}
