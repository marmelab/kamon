import { Injectable } from "@nestjs/common";
import { CreateJwtDto } from "./dto/create-jwt.dto";
import { UpdateJwtDto } from "./dto/update-jwt.dto";
import { Repository } from "typeorm";
import { Jwt } from "./jwt.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../users/user.entity";

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

  findOneByUser(user: User) {
    return this.jwtRepository
      .createQueryBuilder()
      .select("j")
      .from(Jwt, "j")
      .addFrom(User, "u")
      .andWhere('j."userId" = :id')
      .setParameter("id", user.id)
      .getOne();
  }

  findOneByToken(token: string) {
    return this.jwtRepository.findOneBy({
      token,
    });
  }

  findAll() {
    return `This action returns all jwts`;
  }

  findOne(id: number) {
    return this.jwtRepository.findOneBy({ id });
  }

  async update(id: number, updateJwtDto: UpdateJwtDto) {
    const toUpdate = await this.findOne(id);
    const updated = { ...toUpdate, ...updateJwtDto };
    return this.jwtRepository.save(updated);
  }

  remove(id: number) {
    return `This action removes a #${id} jwt`;
  }
}
