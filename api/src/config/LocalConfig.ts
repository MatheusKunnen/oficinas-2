import { PoolConfig as DatabaseConfig } from 'pg';
import fs from 'fs';

export default class LocalConfig {
  data: any = {
    api_port: 5100,
    api_home: '/',
    jwt_secret: 'this-is-my-jwt-secret',
    password_secret: 'this-is-my-password-secret',
    database: {},
  };
  constructor(configFile: string) {
    this.data = {
      ...this.data,
      ...JSON.parse(fs.readFileSync(configFile, 'utf8')),
    };
  }

  public getDatabaseConfig(): DatabaseConfig {
    return this.data.database;
  }

  public getApiPort() {
    return this.data.api_port;
  }

  public getApiHome() {
    return this.data.api_home;
  }

  public getJwtSecret() {
    return this.data.jwt_secret;
  }

  public getPasswordSecret() {
    return this.data.password_secret;
  }
}
