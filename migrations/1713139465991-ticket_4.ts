import { MigrationInterface, QueryRunner } from "typeorm";

export class Ticket41713139465991 implements MigrationInterface {
    name = 'Ticket41713139465991'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_d95d3e41bd3257981d3af113ab"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "idx_position_ticketId" ON "question" ("position", "ticketId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."idx_position_ticketId"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_d95d3e41bd3257981d3af113ab" ON "question" ("position") `);
    }

}
