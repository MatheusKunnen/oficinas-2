import DatabaseConnection from '../database/DatabaseConnection';
import { ParameterModel as Parameter } from '../model/Parameter';
import Dao from './Dao';

export default class ParameterDao extends Dao {
  constructor(connection: DatabaseConnection) {
    super('parameters', connection);
  }

  public async getAllParameters(): Promise<Parameter[] | null> {
    const text = `SELECT * FROM parameter`;
    const result = await this.connection.query({
      text,
    });
    if (result.getRowCount() <= 0) return null;

    return result.getRows() as Parameter[];
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

  public async updateByKey(key: string, value: string): Promise<boolean> {
    const result = await this.connection.query({
      text: 'UPDATE parameter SET value=$1, modification_time=NOW() WHERE key=$2',
      values: [value, key],
    });
    return result.getRowCount() > 0;
  }
}
