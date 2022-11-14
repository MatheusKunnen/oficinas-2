import DatabaseConnection from '../database/DatabaseConnection';
import { ClientDescriptorModel } from '../model/ClientDescriptor';
import Dao from './Dao';

export default class ClientDescriptorDao extends Dao {
  constructor(connection: DatabaseConnection) {
    super('client_descriptor', connection);
  }

  public async create(clientDescriptor: {
    descriptor: Buffer;
    image: Buffer;
  }): Promise<string | null> {
    const id = await this.getNewID();
    const result = await this.connection.query({
      text: `INSERT INTO client_descriptor (id, descriptor, image) VALUES ($1, $2, $3)`,
      values: [id, clientDescriptor.descriptor, clientDescriptor.image],
    });
    if (result.getRowCount() <= 0) return null;
    return id;
  }

  public async getById(id: number): Promise<ClientDescriptorModel | null> {
    const result = await this.connection.query({
      text: `SELECT * FROM client_descriptor WHERE id = $1`,
      values: [id],
    });
    if (result.getRowCount() <= 0) return null;
    return result.getRows()[0] as ClientDescriptorModel;
  }

  private async getNewID(): Promise<string | null> {
    const result = await this.connection.query({
      text: `SELECT nextval('descriptor_id_seq') as id`,
    });
    if (result.getRowCount() <= 0) return null;
    return result.getRows()[0].id;
  }
}
