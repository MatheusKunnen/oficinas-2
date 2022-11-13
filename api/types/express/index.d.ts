import Configuration from '../../src/config/Configuration';
import Database from '../../src/database/Database';
import { UserModel } from '../../src/model/User';

declare global {
  namespace Express {
    interface Request {
      db: Database;
      config: Configuration;
      user?: UserModel;
    }
  }
}
