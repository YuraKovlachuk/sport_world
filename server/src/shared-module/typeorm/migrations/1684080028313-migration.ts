import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1684080028313 implements MigrationInterface {
    name = 'Migration1684080028313'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account_entity" DROP COLUMN "firstName"`);
        await queryRunner.query(`ALTER TABLE "account_entity" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "account_entity" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "account_entity" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "complex_owner_entity" ADD "firstName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "complex_owner_entity" ADD "lastName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "complex_owner_entity" ADD "address" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "complex_owner_entity" ADD "city" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customer_entity" ADD "firstName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customer_entity" ADD "lastName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customer_entity" ADD "address" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customer_entity" ADD "city" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer_entity" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "customer_entity" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "customer_entity" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "customer_entity" DROP COLUMN "firstName"`);
        await queryRunner.query(`ALTER TABLE "complex_owner_entity" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "complex_owner_entity" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "complex_owner_entity" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "complex_owner_entity" DROP COLUMN "firstName"`);
        await queryRunner.query(`ALTER TABLE "account_entity" ADD "city" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "account_entity" ADD "address" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "account_entity" ADD "lastName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "account_entity" ADD "firstName" character varying NOT NULL`);
    }

}
