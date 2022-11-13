import DatabaseConnection from '../database/DatabaseConnection';
import { LockerOcupationModel } from '../model/LockerOcupation';
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

  public async getOcupations(
    max_locker: number,
    onlyInUse = true
  ): Promise<LockerOcupationModel[] | null> {
    const result = await this.connection.query({
      text: `SELECT *, (SELECT id_descriptor FROM locker_ocupation_descriptor lod WHERE id_ocupation = loc.id ORDER BY id_descriptor ASC LIMIT 1) as main_descriptor 
      FROM locker_ocupation loc
      WHERE loc.id_locker < $1 AND (loc.leave_time IS NULL OR 0 = $2) ORDER BY loc.id_locker`,
      values: [max_locker, onlyInUse ? null : 0],
    });
    if (result.getRowCount() <= 0) return null;
    return result.getRows() as LockerOcupationModel[];
  }

  public async getOcupationByLockerId(
    id_locker: number,
    onlyInUse = false
  ): Promise<LockerOcupationModel[] | null> {
    const result = await this.connection.query({
      text: `SELECT *, (SELECT id_descriptor FROM locker_ocupation_descriptor lod WHERE id_ocupation = loc.id ORDER BY id_descriptor ASC LIMIT 1) as main_descriptor 
      FROM locker_ocupation loc
      WHERE loc.id_locker = $1 AND (loc.leave_time IS NULL OR 0 = $2) ORDER BY loc.id_locker`,
      values: [id_locker, onlyInUse ? null : 0],
    });
    if (result.getRowCount() <= 0) return null;
    return result.getRows() as LockerOcupationModel[];
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
