import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1724117597309 implements MigrationInterface {
  name = "CreateUserTable1724117597309";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "session" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "token" character varying NOT NULL, "expireAt" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."role_name_enum" AS ENUM('user', 'admin', 'super_admin')`
    );
    await queryRunner.query(
      `CREATE TABLE "role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" "public"."role_name_enum" NOT NULL DEFAULT 'user', "description" character varying, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."user_gender_enum" AS ENUM('male', 'female', 'other', 'unknown')`
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying(50) NOT NULL, "lastName" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "password" character varying(100), "gender" "public"."user_gender_enum" NOT NULL DEFAULT 'unknown', "isDeleted" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "User Role" ("userId" uuid NOT NULL, "roleId" uuid NOT NULL, CONSTRAINT "PK_08fee33526c33a6f4675db4bb85" PRIMARY KEY ("userId", "roleId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_be328938138e14b16b64106e1d" ON "User Role" ("userId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_97081550a41a889ac68be584da" ON "User Role" ("roleId") `
    );
    await queryRunner.query(
      `ALTER TABLE "session" ADD CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "User Role" ADD CONSTRAINT "FK_be328938138e14b16b64106e1d9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "User Role" ADD CONSTRAINT "FK_97081550a41a889ac68be584da4" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "User Role" DROP CONSTRAINT "FK_97081550a41a889ac68be584da4"`
    );
    await queryRunner.query(
      `ALTER TABLE "User Role" DROP CONSTRAINT "FK_be328938138e14b16b64106e1d9"`
    );
    await queryRunner.query(
      `ALTER TABLE "session" DROP CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_97081550a41a889ac68be584da"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_be328938138e14b16b64106e1d"`
    );
    await queryRunner.query(`DROP TABLE "User Role"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TYPE "public"."user_gender_enum"`);
    await queryRunner.query(`DROP TABLE "role"`);
    await queryRunner.query(`DROP TYPE "public"."role_name_enum"`);
    await queryRunner.query(`DROP TABLE "session"`);
  }
}
