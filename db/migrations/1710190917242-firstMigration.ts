import { MigrationInterface, QueryRunner } from 'typeorm';

export class FirstMigration1710190917242 implements MigrationInterface {
  name = 'FirstMigration1710190917242';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "city" varchar NOT NULL)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
