import { Module } from "@nestjs/common";
import { JwtsService } from "./jwts.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Jwt } from "./jwt.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Jwt])],
  providers: [JwtsService],
  exports: [JwtsService],
})
export class JwtsModule {}
