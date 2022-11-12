import { PoolClient, QueryConfig } from 'pg';
import DatabaseResult from './DatabaseResult';

export default class DatabaseConnection {
  private conn: PoolClient;

  constructor(conn: PoolClient) {
    this.conn = conn;
  }

  public async query(queryConf: QueryConfig): Promise<DatabaseResult> {
    const result = await this.conn.query(queryConf);
    return new DatabaseResult(result);
  }

  public release() {
    this.conn.release();
  }
}
