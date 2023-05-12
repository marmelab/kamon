import { DataSource } from "typeorm";
import { Game } from "./game/game.entity";
import { User } from "./users/user.entity";
import { config } from "dotenv";
import { Jwt } from "./jwts/jwt.entity";
config();

export const PostgresDataSource = new DataSource({
  type: "postgres",
  host: process.env["POSTGRES_HOST"],
  port: Number(process.env["POSTGRES_PORT"]),
  username: process.env["POSTGRES_USER"],
  password: process.env["POSTGRES_PASSWORD"],
  database: process.env["POSTGRES_DATABASE"],
  entities: [Game, User, Jwt],
  migrations: ["./**/migrations/*.js"],
});

PostgresDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
