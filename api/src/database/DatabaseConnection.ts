import { PoolClient, QueryConfig } from 'pg';
import DatabaseResult from './DatabaseResult';

export default class DatabaseConnection {
  private conn: PoolClient;
  private inTransaction = false;

  constructor(conn: PoolClient) {
    this.conn = conn;
  }

  public async startTransaction(): Promise<void> {
    this.conn.query('BEGIN');
    this.inTransaction = true;
    return;
  }

  public async commit(): Promise<void> {
    this.conn.query('COMMIT');
    this.inTransaction = false;
    return;
  }

  public async rollback(): Promise<void> {
    this.conn.query('ROLLBACK');
    this.inTransaction = false;
    return;
  }

  public async query(queryConf: QueryConfig): Promise<DatabaseResult> {
    const result = await this.conn.query(queryConf);
    return new DatabaseResult(result);
  }

  public release() {
    if (this.inTransaction) {
      console.error(
        'WARNING::DatabaseConnection::Connection released with a transaction in progress.'
      );
      this.rollback();
    }
    this.conn.release();
  }
}
