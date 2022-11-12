import { QueryResult } from 'pg';
export default class DatabaseResult {
  private result: QueryResult;

  constructor(result: QueryResult) {
    this.result = result;
  }

  public getRowCount(): number {
    return this.result.rowCount;
  }

  public getRows() {
    return this.result.rows;
  }
}
