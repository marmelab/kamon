import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1682543330723 implements MigrationInterface {
    name = 'Migration1682543330723'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "username" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username")`);
        await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "game" ADD "playerBlackId" integer`);
        await queryRunner.query(`ALTER TABLE "game" ADD "playerWhiteId" integer`);
        await queryRunner.query(`ALTER TABLE "game" ADD CONSTRAINT "FK_60e3757f56d921f61eecf728bb6" FOREIGN KEY ("playerBlackId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "game" ADD CONSTRAINT "FK_72f3b8cc718f7fa4bab4e75d03d" FOREIGN KEY ("playerWhiteId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "game" DROP CONSTRAINT "FK_72f3b8cc718f7fa4bab4e75d03d"`);
        await queryRunner.query(`ALTER TABLE "game" DROP CONSTRAINT "FK_60e3757f56d921f61eecf728bb6"`);
        await queryRunner.query(`ALTER TABLE "game" DROP COLUMN "playerWhiteId"`);
        await queryRunner.query(`ALTER TABLE "game" DROP COLUMN "playerBlackId"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "username"`);
    }

}
