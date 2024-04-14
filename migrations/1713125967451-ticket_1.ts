import { MigrationInterface, QueryRunner } from 'typeorm';

export class Ticket11713125967451 implements MigrationInterface {
  name = 'Ticket11713125967451';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "answers" ("id" SERIAL NOT NULL, "answer" character varying NOT NULL, "isCorrect" boolean NOT NULL, "issueId" integer NOT NULL, CONSTRAINT "PK_9c32cec6c71e06da0254f2226c6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "question" ("id" SERIAL NOT NULL, "img" text, "question" text NOT NULL, "help" text NOT NULL, "ticketId" integer NOT NULL, CONSTRAINT "PK_21e5786aa0ea704ae185a79b2d5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tickets" ("id" SERIAL NOT NULL, "position" integer NOT NULL, CONSTRAINT "PK_343bc942ae261cf7a1377f48fd0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "answers" ADD CONSTRAINT "FK_3f874bb5c414ef182049c54113a" FOREIGN KEY ("issueId") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "question" ADD CONSTRAINT "FK_f08be7a577cebe968fabd11d85d" FOREIGN KEY ("ticketId") REFERENCES "tickets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "question" DROP CONSTRAINT "FK_f08be7a577cebe968fabd11d85d"`);
    await queryRunner.query(`ALTER TABLE "answers" DROP CONSTRAINT "FK_3f874bb5c414ef182049c54113a"`);
    await queryRunner.query(`DROP TABLE "tickets"`);
    await queryRunner.query(`DROP TABLE "question"`);
    await queryRunner.query(`DROP TABLE "answers"`);
  }
}
