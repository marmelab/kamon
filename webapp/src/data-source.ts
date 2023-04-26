import { DataSource } from "typeorm";
import { Game } from "./game/game.entity";
import { User } from "./user/user.entity";
import { config } from "dotenv";
config();

export const PostgresDataSource = new DataSource({
  type: "postgres",
  host: process.env["POSTGRES_HOST"],
  port: Number(process.env["POSTGRES_PORT"]),
  username: process.env["POSTGRES_USER"],
  password: process.env["POSTGRES_PASSWORD"],
  database: process.env["POSTGRES_DATABASE"],
  entities: [Game, User],
});
