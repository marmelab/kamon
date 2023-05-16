import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1684222933164 implements MigrationInterface {
    name = 'Migration1684222933164'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "game" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "game" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "game" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "game" DROP COLUMN "createdAt"`);
    }

}
