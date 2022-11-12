import { Pool, types, PoolConfig } from 'pg';
import DatabaseConnection from './DatabaseConnection';

export default class Database {
  private static STATIC_TYPES_INITIALIZED = false;
  private config: PoolConfig;
  private pool: Pool;
  private ready: boolean = false;

  constructor(config: PoolConfig) {
    this.config = config;
    Database.initStaticTypes();
    // Init connection pool
    this.pool = new Pool(this.config);
    this.pool.on('error', (err, _client) => {
      console.error(`ERROR::DATABASE::${err.name}::${err.message}`);
      this.ready = false;
    });

    // Test connection
    this.pool.connect((err, client, release) => {
      if (err) {
        console.error(`ERROR::DATABASE::${err.name}::${err.message}`);
        this.ready = false;
      } else {
        this.ready = true;
        console.debug(
          `Database ${this.config.user}@${this.config.host}:${this.config.port}/${this.config.database} connected!`
        );
      }
      release();
    });
  }

  public async getConnection(canWait = false): Promise<DatabaseConnection> {
    if (!this.ready && !canWait)
      throw Error('ERROR::DATABASE::getConnection::Database pool not ready');

    const waitOn = (resolve: Function, reject: Function) => {
      if (!this.ready) setTimeout(() => waitOn(resolve, reject), 500);
      else resolve();
    };
    await new Promise(waitOn);

    const conn = await this.pool.connect();
    return new DatabaseConnection(conn);
  }

  // Configura parser de tipos de dados
  private static initStaticTypes(): void {
    if (!Database.STATIC_TYPES_INITIALIZED) {
      types.setTypeParser(1700, 'text', parseFloat);
      types.setTypeParser(1114, function (stringValue: any) {
        return stringValue;
      });
      Database.STATIC_TYPES_INITIALIZED = true;
    }
  }

  public isReady() {
    return this.isReady;
  }
}
