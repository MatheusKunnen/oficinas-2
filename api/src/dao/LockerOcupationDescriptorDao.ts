import DatabaseConnection from '../database/DatabaseConnection';
import Dao from './Dao';

export default class LockerOcupationDescriptorDao extends Dao {
  constructor(connection: DatabaseConnection) {
    super('locker_ocupation_descriptor', connection);
  }

  public async create(data: {
    id_ocupation: string;
    id_descriptor: string;
    id_parent_descriptor?: string;
  }): Promise<string | null> {
    const id = await this.getNewID();
    const result = await this.connection.query({
      text: `INSERT INTO locker_ocupation_descriptor (id, id_ocupation, id_descriptor, id_parent_descriptor) VALUES ($1, $2, $3, $4)`,
      values: [
        id,
        data.id_ocupation,
        data.id_descriptor,
        data.id_parent_descriptor ? data.id_parent_descriptor : null,
      ],
    });

    if (result.getRowCount() <= 0) return null;
    else return id;
  }

  private async getNewID(): Promise<string> {
    const result = await this.connection.query({
      text: `SELECT nextval('locker_ocupation_descriptor_id_seq') as id`,
    });
    if (result.getRowCount() <= 0) return '-1';
    return result.getRows()[0].id;
  }
}
