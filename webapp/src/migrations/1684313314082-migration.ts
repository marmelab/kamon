import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1684313314082 implements MigrationInterface {
    name = 'Migration1684313314082'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "game" DROP CONSTRAINT "FK_60e3757f56d921f61eecf728bb6"`);
        await queryRunner.query(`ALTER TABLE "game" DROP CONSTRAINT "FK_72f3b8cc718f7fa4bab4e75d03d"`);
        await queryRunner.query(`ALTER TABLE "game" ADD CONSTRAINT "FK_60e3757f56d921f61eecf728bb6" FOREIGN KEY ("playerBlackId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "game" ADD CONSTRAINT "FK_72f3b8cc718f7fa4bab4e75d03d" FOREIGN KEY ("playerWhiteId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "game" DROP CONSTRAINT "FK_72f3b8cc718f7fa4bab4e75d03d"`);
        await queryRunner.query(`ALTER TABLE "game" DROP CONSTRAINT "FK_60e3757f56d921f61eecf728bb6"`);
        await queryRunner.query(`ALTER TABLE "game" ADD CONSTRAINT "FK_72f3b8cc718f7fa4bab4e75d03d" FOREIGN KEY ("playerWhiteId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "game" ADD CONSTRAINT "FK_60e3757f56d921f61eecf728bb6" FOREIGN KEY ("playerBlackId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
