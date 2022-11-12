import Configuration from '../../src/config/Configuration';
import Database from '../../src/database/Database';

declare global {
  namespace Express {
    interface Request {
      db: Database;
      config: Configuration;
    }
  }
}
