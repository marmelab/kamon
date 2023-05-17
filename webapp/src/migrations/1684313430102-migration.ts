import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1684313430102 implements MigrationInterface {
    name = 'Migration1684313430102'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "jwt" DROP CONSTRAINT "FK_690dc6b83bb053b2ccd4342a17f"`);
        await queryRunner.query(`ALTER TABLE "jwt" ADD CONSTRAINT "FK_690dc6b83bb053b2ccd4342a17f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "jwt" DROP CONSTRAINT "FK_690dc6b83bb053b2ccd4342a17f"`);
        await queryRunner.query(`ALTER TABLE "jwt" ADD CONSTRAINT "FK_690dc6b83bb053b2ccd4342a17f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
