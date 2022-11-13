import DatabaseConnection from '../database/DatabaseConnection';
import Dao from './Dao';

export default class LockerOcupationDao extends Dao {
  constructor(conn: DatabaseConnection) {
    super('locker_ocupation', conn);
  }

  public async create(lockerOcupation: {
    id_locker: number;
  }): Promise<string | null> {
    const id = await this.getNewID();
    const result = await this.connection.query({
      text: 'INSERT INTO locker_ocupation (id, id_locker, entrance_time, leave_time) VALUES ($1, $2, NOW(), NULL)',
      values: [id, lockerOcupation.id_locker],
    });
    if (result.getRowCount() <= 0) return null;
    return id;
  }

  public async leave(id: number): Promise<number | null> {
    const result = await this.connection.query({
      text: 'UPDATE locker_ocupation SET leave_time=NOW() WHERE id=$1',
      values: [id],
    });
    if (result.getRowCount() <= 0) return null;
    return id;
  }

  private async getNewID(): Promise<string> {
    const result = await this.connection.query({
      text: `SELECT nextval('locker_ocupation_id_seq') as id`,
    });
    if (result.getRowCount() <= 0) return '-1';
    return result.getRows()[0].id;
  }
}
