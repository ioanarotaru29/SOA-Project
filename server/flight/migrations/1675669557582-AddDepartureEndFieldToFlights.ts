import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDepartureEndFieldToFlights1675669557582 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `flight` ADD `departureEnd` datetime');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `flight` DROP COLUMN `departureEnd`');
  }
}
