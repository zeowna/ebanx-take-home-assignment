import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNegativeLimitToAccount1747769232039
  implements MigrationInterface
{
  name = 'AddNegativeLimitToAccount1747769232039';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "account" ADD "negative_limit" double precision NOT NULL DEFAULT '0'`,
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "account" DROP COLUMN "negative_limit"`,
    );
  }
}
