import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigrate1688531812194 implements MigrationInterface {
    name = 'NewMigrate1688531812194'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservation" DROP CONSTRAINT "FK_b947e0cefb573a6ba4a15c85b2c"`);
        await queryRunner.query(`ALTER TABLE "reservation" DROP CONSTRAINT "FK_529dceb01ef681127fef04d755d"`);
        await queryRunner.query(`ALTER TABLE "reservation" ADD CONSTRAINT "FK_b947e0cefb573a6ba4a15c85b2c" FOREIGN KEY ("showId") REFERENCES "show"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reservation" ADD CONSTRAINT "FK_529dceb01ef681127fef04d755d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservation" DROP CONSTRAINT "FK_529dceb01ef681127fef04d755d"`);
        await queryRunner.query(`ALTER TABLE "reservation" DROP CONSTRAINT "FK_b947e0cefb573a6ba4a15c85b2c"`);
        await queryRunner.query(`ALTER TABLE "reservation" ADD CONSTRAINT "FK_529dceb01ef681127fef04d755d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reservation" ADD CONSTRAINT "FK_b947e0cefb573a6ba4a15c85b2c" FOREIGN KEY ("showId") REFERENCES "show"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
