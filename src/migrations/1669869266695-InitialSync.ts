import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { TableName } from '../common/types';

export class InitialSync1642350667736 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.connection.synchronize(true);
    await queryRunner.createTable(
      new Table({
        name: TableName.MIGRATION,
        columns: [
          {
            name: 'id',
            isPrimary: true,
            generationStrategy: 'increment',
            type: 'serial',
          },
          { name: 'timestamp', type: 'int8', isNullable: false },
          { name: 'name', type: 'varchar', isNullable: false },
        ],
      }),
      true,
      true,
      true,
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    const tables: Record<'tablename', string>[] = await queryRunner.query(
      `SELECT table_name as tablename from information_schema.tables WHERE table_schema='public';`,
    );
    await Promise.all(
      tables.map(async ({ tablename }) => {
        if (tablename === TableName.MIGRATION) {
          return undefined;
        }
        return queryRunner.query(
          `DROP TABLE IF EXISTS "${tablename}" CASCADE;`,
        );
      }),
    );
  }
}
