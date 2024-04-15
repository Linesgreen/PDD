import { MigrationInterface, QueryRunner } from "typeorm";

export class Ticket31713138168280 implements MigrationInterface {
    name = 'Ticket31713138168280'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tickets" ADD "number" integer NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_78e08cc1101fc17f77c6f11b4c" ON "tickets" ("number") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_78e08cc1101fc17f77c6f11b4c"`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP COLUMN "number"`);
    }

}
