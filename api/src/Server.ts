import express from 'express';
import cors from 'cors';
import os from 'os';
import morgan from 'morgan';
import LocalConfig from './config/LocalConfig';
import Database from './database/Database';
import Configuration from './config/Configuration';
import useConfiguration from './middleware/useConfiguration';
import useDatabase from './middleware/useDatabase';
import AuthManager from './utils/AuthManager';
import UserRoute from './routes/UserRoute';
import errorHandler from './middleware/errorHandler';
import notFoundHandler from './middleware/notFoundHandler';
import ParameterRoute from './routes/ParameterRoute';

export default class Server {
  private app: express.Application;
  private database: Database;
  private localConfig: LocalConfig;
  private configuration: Configuration;

  constructor(configFile: string) {
    this.localConfig = new LocalConfig(configFile);
    this.database = new Database(this.localConfig.getDatabaseConfig());
    this.configuration = new Configuration(this.database);
    AuthManager.setDefault(
      new AuthManager(
        this.localConfig.getPasswordSecret(),
        this.localConfig.getJwtSecret()
      )
    );
    this.app = express();
    this.app.use(morgan('dev'));
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(useConfiguration(this.configuration));
    this.app.use(useDatabase(this.database));

    this.initEndpoints();

    this.app.use(errorHandler());
    this.app.use(notFoundHandler());
  }

  private initEndpoints() {
    // Parameters router
    const parametersRoute = new ParameterRoute(
      this.configuration,
      this.app,
      this.localConfig.getApiHome()
    );
    parametersRoute.initRouter();
    // User router
    const userRoute = new UserRoute(
      this.configuration,
      this.app,
      this.localConfig.getApiHome()
    );
    userRoute.initRouter();
  }

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
