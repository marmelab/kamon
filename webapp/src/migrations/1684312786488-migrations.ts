import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1684312786488 implements MigrationInterface {
  name?: "Migrations1684312786488";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('grant select on public."user" to web_anon;');
    await queryRunner.query('grant update on public."user" to web_anon;');
    await queryRunner.query('grant delete on public."user" to web_anon;');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('revoke select on public."user" to web_anon;');
    await queryRunner.query('revoke update on public."user" to web_anon;');
    await queryRunner.query('revoke delete on public."user" to web_anon;');
  }
}
