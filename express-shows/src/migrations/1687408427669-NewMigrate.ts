import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigrate1687408427669 implements MigrationInterface {
    name = 'NewMigrate1687408427669'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "show" RENAME COLUMN "availableSeatCount" TO "seats"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "show" RENAME COLUMN "seats" TO "availableSeatCount"`);
    }

}
