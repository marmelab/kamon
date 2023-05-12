import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1683809187078 implements MigrationInterface {
  name = "Migration1683809187078";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "jwt" ("id" SERIAL NOT NULL, "token" character varying NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "iat" integer NOT NULL, "exp" integer NOT NULL, "userId" integer, CONSTRAINT "PK_5d23295f3f8f90b85e63e8040fd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "jwt" ADD CONSTRAINT "FK_690dc6b83bb053b2ccd4342a17f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "jwt" DROP CONSTRAINT "FK_690dc6b83bb053b2ccd4342a17f"`,
    );
    await queryRunner.query(`DROP TABLE "jwt"`);
  }
}
