import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { GameModule } from "./game/game.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from "path";
import { AuthModule } from "./auth/auth.module";
import { EventsService } from "./events.service";
import { ApiModule } from './api/api.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, "..", "public"),
      serveRoot: "/public/",
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get("POSTGRES_HOST"),
        port: parseInt(configService.get("POSTGRES_PORT")),
        username: configService.get("POSTGRES_USER"),
        password: configService.get("POSTGRES_PASSWORD"),
        database: configService.get("POSTGRES_DATABASE"),
        autoLoadEntities: true,
        entities: ["*/*.entity.*.js"],
        migrations: ["./**/migrations/*.js"],
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot(),
    GameModule,
    AuthModule,
    ApiModule,
  ],

  controllers: [AppController],
  providers: [AppService, EventsService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
