import { MigrationInterface, QueryRunner } from 'typeorm';

export class Tables1746909093672 implements MigrationInterface {
  name = 'Tables1746909093672';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
        CREATE TABLE "account" (
            "id" SERIAL NOT NULL, 
            "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
            "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
            "name" character varying NOT NULL, 
            "national_register" character varying NOT NULL, 
            CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id")
        )
        `,
    );
    await queryRunner.query(
      `
        CREATE TABLE "balance" ("id" SERIAL NOT NULL, 
            "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
            "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
            "current_balance" double precision NOT NULL DEFAULT '0', 
            "account_id" integer, 
            CONSTRAINT "PK_079dddd31a81672e8143a649ca0" PRIMARY KEY ("id")
        )
        `,
    );
    await queryRunner.query(
      `
        CREATE TABLE "event" ("id" SERIAL NOT NULL, 
            "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
            "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
            "type" character varying NOT NULL, 
            "amount" double precision NOT NULL, 
            "origin_id" integer, 
            "destination_id" integer, 
            CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id")
        )
        `,
    );
    await queryRunner.query(
      `ALTER TABLE "balance" ADD CONSTRAINT "FK_08a76919ccd3887911dd30b9116" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "event" ADD CONSTRAINT "FK_24373a987ffbb085e1c222bc202" FOREIGN KEY ("origin_id") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "event" ADD CONSTRAINT "FK_e0fe710f7b5b768b59270f7ac05" FOREIGN KEY ("destination_id") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "event" DROP CONSTRAINT "FK_e0fe710f7b5b768b59270f7ac05"`,
    );
    await queryRunner.query(
      `ALTER TABLE "event" DROP CONSTRAINT "FK_24373a987ffbb085e1c222bc202"`,
    );
    await queryRunner.query(
      `ALTER TABLE "balance" DROP CONSTRAINT "FK_08a76919ccd3887911dd30b9116"`,
    );
    await queryRunner.query(`DROP TABLE "event"`);
    await queryRunner.query(`DROP TABLE "balance"`);
    await queryRunner.query(`DROP TABLE "account"`);
  }
}
