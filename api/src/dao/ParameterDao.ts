import DatabaseConnection from '../database/DatabaseConnection';
import { ParameterModel as Parameter } from '../model/Parameter';
import Dao from './Dao';

export default class ParameterDao extends Dao {
  constructor(connection: DatabaseConnection) {
    super('parameters', connection);
  }

  public async getParameters(keys: string[]): Promise<Parameter[] | null> {
    const text = `SELECT * FROM parameter WHERE key IN (${keys
      .map((_, i) => `$${i + 1}`)
      .join(',')})`;
    const result = await this.connection.query({
      text,
      values: [...keys],
    });
    if (result.getRowCount() <= 0) return null;

    return result.getRows() as Parameter[];
  }
}
