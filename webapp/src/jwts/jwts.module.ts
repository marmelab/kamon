import { Module } from "@nestjs/common";
import { JwtsService } from "./jwts.service";
import { JwtsController } from "./jwts.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Jwt } from "./jwt.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Jwt])],
  controllers: [JwtsController],
  providers: [JwtsService],
  exports: [JwtsService],
})
export class JwtsModule {}
