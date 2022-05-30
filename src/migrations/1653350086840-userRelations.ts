import { MigrationInterface, QueryRunner } from 'typeorm';

export class userRelations1653350086840 implements MigrationInterface {
  name = 'userRelations1653350086840';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_followers" ("follower_id" uuid NOT NULL, "following_id" uuid NOT NULL, CONSTRAINT "PK_81bc622bd88e6ea821f9fa0ed97" PRIMARY KEY ("follower_id", "following_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_da722d93356ae3119d6be40d98" ON "user_followers" ("follower_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0092daece8ed943fec27d37c41" ON "user_followers" ("following_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_followers" ADD CONSTRAINT "FK_da722d93356ae3119d6be40d988" FOREIGN KEY ("follower_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_followers" ADD CONSTRAINT "FK_0092daece8ed943fec27d37c413" FOREIGN KEY ("following_id") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_followers" DROP CONSTRAINT "FK_0092daece8ed943fec27d37c413"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_followers" DROP CONSTRAINT "FK_da722d93356ae3119d6be40d988"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "created_at"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_0092daece8ed943fec27d37c41"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_da722d93356ae3119d6be40d98"`,
    );
    await queryRunner.query(`DROP TABLE "user_followers"`);
  }
}
