import { MigrationInterface, QueryRunner } from 'typeorm';

export class migrations1659032033491 implements MigrationInterface {
  name = 'migrations1659032033491';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "Token" ("tokenId" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" character varying NOT NULL, "accessToken" character varying NOT NULL, "refreshToken" character varying NOT NULL, CONSTRAINT "PK_8c0c021664f8baa6194e1c4bfa9" PRIMARY KEY ("tokenId"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "User" ALTER COLUMN "updatedAt" SET DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "User" ALTER COLUMN "updatedAt" SET DEFAULT ('now'::text)::timestamp(6) with time zone`,
    );
    await queryRunner.query(`DROP TABLE "Token"`);
  }
}
