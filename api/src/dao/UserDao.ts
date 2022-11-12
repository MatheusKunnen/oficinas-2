import DatabaseConnection from '../database/DatabaseConnection';
import Dao from './Dao';
import { UserModel as User } from '../model/User';

export default class UserDao extends Dao {
  constructor(connection: DatabaseConnection) {
    super('user', connection);
  }

  public async getByUsername(alias: string): Promise<User> | null {
    const result = await this.connection.query({
      text: `SELECT * FROM user WHERE username = $1`,
      values: [alias],
    });
    if (result.getRowCount() <= 0) return null;

    return result.getRows()[0] as User;
  }

  public async create(user: User): Promise<User | null> {
    const result = await this.connection.query({
      text: `INSERT INTO user (username, password, privilege, active, last_login) VALUES ($1,$2,$3,$4,NOW())`,
      values: [
        user.username,
        user.password,
        user.privilege,
        user.active,
        user.last_login,
      ],
    });
    if (result.getRowCount() <= 0) return null;

    return result.getRows()[0] as User;
  }
}
