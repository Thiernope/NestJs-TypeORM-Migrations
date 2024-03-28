import { MigrationInterface, QueryRunner } from 'typeorm';

export class FirstMigration1711633670791 implements MigrationInterface {
  name = 'FirstMigration1711633670791';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "book" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL)`,
    );
    await queryRunner.query(
      `CREATE TABLE "page" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL, "book_id" integer NOT NULL)`,
    );
    await queryRunner.query(
      `CREATE TABLE "question" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "question" varchar NOT NULL, "page_id" integer NOT NULL)`,
    );
    await queryRunner.query(
      `CREATE TABLE "employee" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "gender" varchar NOT NULL)`,
    );
    await queryRunner.query(
      `CREATE TABLE "contact" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "phone" varchar NOT NULL, "email" varchar NOT NULL, "employee_id" integer NOT NULL, CONSTRAINT "REL_c472fb90fecc527bc5646ea487" UNIQUE ("employee_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_page" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL, "book_id" integer NOT NULL, CONSTRAINT "FK_ea2d07f511e8a9389ac20404442" FOREIGN KEY ("book_id") REFERENCES "book" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_page"("id", "title", "description", "book_id") SELECT "id", "title", "description", "book_id" FROM "page"`,
    );
    await queryRunner.query(`DROP TABLE "page"`);
    await queryRunner.query(`ALTER TABLE "temporary_page" RENAME TO "page"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_question" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "question" varchar NOT NULL, "page_id" integer NOT NULL, CONSTRAINT "FK_d6769e9c01ba0bcd801e7e2417d" FOREIGN KEY ("page_id") REFERENCES "page" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_question"("id", "question", "page_id") SELECT "id", "question", "page_id" FROM "question"`,
    );
    await queryRunner.query(`DROP TABLE "question"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_question" RENAME TO "question"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_contact" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "phone" varchar NOT NULL, "email" varchar NOT NULL, "employee_id" integer NOT NULL, CONSTRAINT "REL_c472fb90fecc527bc5646ea487" UNIQUE ("employee_id"), CONSTRAINT "FK_c472fb90fecc527bc5646ea4877" FOREIGN KEY ("employee_id") REFERENCES "employee" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_contact"("id", "phone", "email", "employee_id") SELECT "id", "phone", "email", "employee_id" FROM "contact"`,
    );
    await queryRunner.query(`DROP TABLE "contact"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_contact" RENAME TO "contact"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "contact" RENAME TO "temporary_contact"`,
    );
    await queryRunner.query(
      `CREATE TABLE "contact" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "phone" varchar NOT NULL, "email" varchar NOT NULL, "employee_id" integer NOT NULL, CONSTRAINT "REL_c472fb90fecc527bc5646ea487" UNIQUE ("employee_id"))`,
    );
    await queryRunner.query(
      `INSERT INTO "contact"("id", "phone", "email", "employee_id") SELECT "id", "phone", "email", "employee_id" FROM "temporary_contact"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_contact"`);
    await queryRunner.query(
      `ALTER TABLE "question" RENAME TO "temporary_question"`,
    );
    await queryRunner.query(
      `CREATE TABLE "question" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "question" varchar NOT NULL, "page_id" integer NOT NULL)`,
    );
    await queryRunner.query(
      `INSERT INTO "question"("id", "question", "page_id") SELECT "id", "question", "page_id" FROM "temporary_question"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_question"`);
    await queryRunner.query(`ALTER TABLE "page" RENAME TO "temporary_page"`);
    await queryRunner.query(
      `CREATE TABLE "page" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "description" varchar NOT NULL, "book_id" integer NOT NULL)`,
    );
    await queryRunner.query(
      `INSERT INTO "page"("id", "title", "description", "book_id") SELECT "id", "title", "description", "book_id" FROM "temporary_page"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_page"`);
    await queryRunner.query(`DROP TABLE "contact"`);
    await queryRunner.query(`DROP TABLE "employee"`);
    await queryRunner.query(`DROP TABLE "question"`);
    await queryRunner.query(`DROP TABLE "page"`);
    await queryRunner.query(`DROP TABLE "book"`);
  }
}
