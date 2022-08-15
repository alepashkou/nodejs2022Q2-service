import { MigrationInterface, QueryRunner } from 'typeorm';

export class migrations1658901497454 implements MigrationInterface {
  name = 'migrations1658901497454';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "Artist" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "grammy" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_7c07e38dd0d817a103966c5876e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "Album" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "year" integer, "artistId" uuid, CONSTRAINT "PK_715d259ae16fb1e669fb69ef155" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "Favorites" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, "typeId" character varying NOT NULL, CONSTRAINT "PK_83cd0162b05b05e9a88cb3e5ad0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "User" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" character varying NOT NULL, "password" character varying NOT NULL, "version" integer NOT NULL DEFAULT '1', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "Track" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "artistId" uuid, "albumId" uuid, "duration" integer NOT NULL, CONSTRAINT "PK_51ee6369b97c61b87ff510bcd33" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "Album" ADD CONSTRAINT "FK_7e5f0ed6b42c66789d4435ba8eb" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "Track" ADD CONSTRAINT "FK_aa1f298d1ff6728d65b4232713f" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "Track" ADD CONSTRAINT "FK_8cd82637ad035c862207206de57" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "Track" DROP CONSTRAINT "FK_8cd82637ad035c862207206de57"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Track" DROP CONSTRAINT "FK_aa1f298d1ff6728d65b4232713f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "Album" DROP CONSTRAINT "FK_7e5f0ed6b42c66789d4435ba8eb"`,
    );
    await queryRunner.query(`DROP TABLE "Track"`);
    await queryRunner.query(`DROP TABLE "User"`);
    await queryRunner.query(`DROP TABLE "Favorites"`);
    await queryRunner.query(`DROP TABLE "Album"`);
    await queryRunner.query(`DROP TABLE "Artist"`);
  }
}
