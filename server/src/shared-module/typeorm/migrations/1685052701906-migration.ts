import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1685052701906 implements MigrationInterface {
    name = 'Migration1685052701906'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sport_complex_entity" ADD CONSTRAINT "UQ_ed86d9fbce9e21e00b9e2c06ba7" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "sport_complex_entity" ALTER COLUMN "rate" SET DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sport_complex_entity" ALTER COLUMN "rate" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "sport_complex_entity" DROP CONSTRAINT "UQ_ed86d9fbce9e21e00b9e2c06ba7"`);
    }

}
