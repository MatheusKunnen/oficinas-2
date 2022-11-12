import express from 'express';
import cors from 'cors';
import os from 'os';
import LocalConfig from './config/LocalConfig';
import Database from './database/Database';
import Configuration from './config/Configuration';
import useConfiguration from './middleware/useConfiguration';
import useDatabase from './middleware/useDatabase';

export default class Server {
  private app: express.Application;
  private database: Database;
  private localConfig: LocalConfig;
  private configuration: Configuration;

  constructor(configFile: string) {
    this.localConfig = new LocalConfig(configFile);
    this.database = new Database(this.localConfig.getDatabaseConfig());
    this.configuration = new Configuration(this.database);

    this.app = express();
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(useConfiguration(this.configuration));
    this.app.use(useDatabase(this.database));

    this.initEndpoints();
  }

  private initEndpoints() {}

  public start() {
    this.app.listen(this.localConfig.getApiPort(), () => {
      console.log(
        `Server running on ${
          os.hostname
        }:${this.localConfig.getApiPort()}${this.localConfig.getApiHome()}`
      );
    });
  }
}
