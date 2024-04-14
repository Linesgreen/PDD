import { MigrationInterface, QueryRunner } from "typeorm";

export class Ticket21713135774431 implements MigrationInterface {
    name = 'Ticket21713135774431'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tickets" DROP COLUMN "position"`);
        await queryRunner.query(`ALTER TABLE "question" ADD "position" integer NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_d95d3e41bd3257981d3af113ab" ON "question" ("position") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_d95d3e41bd3257981d3af113ab"`);
        await queryRunner.query(`ALTER TABLE "question" DROP COLUMN "position"`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD "position" integer NOT NULL`);
    }

}
