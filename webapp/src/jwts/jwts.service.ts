import { Injectable } from "@nestjs/common";
import { CreateJwtDto } from "./dto/create-jwt.dto";
import { UpdateJwtDto } from "./dto/update-jwt.dto";
import { Repository } from "typeorm";
import { Jwt } from "./jwt.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class JwtsService {
  jwtRepository: Repository<Jwt>;

  constructor(
    @InjectRepository(Jwt)
    jwtRepository: Repository<Jwt>,
  ) {
    this.jwtRepository = jwtRepository;
  }

  create(createJwtDto: CreateJwtDto) {
    const jwt = { ...createJwtDto, isActive: true };
    return this.jwtRepository.save(jwt);
  }

  findAll() {
    return `This action returns all jwts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} jwt`;
  }

  update(id: number, updateJwtDto: UpdateJwtDto) {
    return `This action updates a #${id} jwt`;
  }

  remove(id: number) {
    return `This action removes a #${id} jwt`;
  }
}
