import ParameterDao from '../dao/ParameterDao';
import Database from '../database/Database';
import { ParameterModel } from '../model/Parameter';

export default class Configuration {
  private static PARAMETERS_KEYS = ['num_lockers', 'locker_on_time'];
  private database: Database;
  private numLockers = 2;
  private lockerOnTime = 5000;

  constructor(database: Database) {
    this.database = database;
    this.init();
  }

  public getNumLockers() {
    return this.getNumLockers;
  }

  public getLockerOnTime() {
    return this.getLockerOnTime;
  }

  public getConfigForLocker() {
    return {
      num_lockers: this.getNumLockers(),
      locket_on_time: this.getLockerOnTime(),
    };
  }

  private async init() {
    const conn = await this.database.getConnection(true);
    try {
      const parameterDao = new ParameterDao(conn);
      const parameters = await parameterDao.getParameters(
        Configuration.PARAMETERS_KEYS
      );
      if (
        parameters == null ||
        parameters.length != Configuration.PARAMETERS_KEYS.length
      )
        throw new Error(
          `ERROR::Configuration::init::Not enought parameters ${
            parameters !== null ? parameters.length : 0
          }/${Configuration.PARAMETERS_KEYS.length}`
        );
      this.parseParameters(parameters);
    } catch (error) {
      throw error;
    } finally {
      conn.release();
    }
  }

  private parseParameters(parameters: ParameterModel[]) {
    parameters.forEach((parameter) => {
      switch (parameter.key) {
        case 'num_lockers':
          this.numLockers = parseInt(parameter.value);
          break;
        case 'locker_on_time':
          this.lockerOnTime = parseInt(parameter.value);
          break;
        default:
          console.error(
            `ERROR:Configuration::Unknown parameter ${parameter.key}:${parameter.value}`
          );
      }
    });
  }
}
