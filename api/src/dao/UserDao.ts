import DatabaseConnection from '../database/DatabaseConnection';
import Dao from './Dao';
import { UserModel } from '../model/User';

export default class UserDao extends Dao {
  constructor(connection: DatabaseConnection) {
    super('user', connection);
  }

  public async getByUsername(alias: string): Promise<UserModel | null> {
    const result = await this.connection.query({
      text: `SELECT * FROM users WHERE username = $1`,
      values: [alias],
    });
    if (result.getRowCount() <= 0) return null;

    return result.getRows()[0] as UserModel;
  }

  public async create(user: UserModel): Promise<UserModel | null> {
    console.log(user);
    try {
      const result = await this.connection.query({
        text: `INSERT INTO users (id, username, password, privilege) VALUES (nextval('user_id_seq'), $1,$2,$3)`,
        values: [user.username, user.password, user.privilege],
      });
      if (result.getRowCount() <= 0) return null;

      return result.getRows()[0] as UserModel;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
