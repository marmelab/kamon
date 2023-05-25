import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1685017177348 implements MigrationInterface {
    name = 'Migration1685017177348'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "game" ADD "isSolo" boolean DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "game" DROP COLUMN "isSolo"`);
    }

}
