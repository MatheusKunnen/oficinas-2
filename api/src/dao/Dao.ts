import DatabaseConnection from '../database/DatabaseConnection';

export default abstract class Dao {
  protected readonly connection: DatabaseConnection;
  protected readonly tableName: string;

  constructor(tableName: string, connection: DatabaseConnection) {
    this.tableName = tableName;
    this.connection = connection;
  }
}
