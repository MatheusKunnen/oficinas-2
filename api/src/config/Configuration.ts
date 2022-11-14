import ParameterDao from '../dao/ParameterDao';
import Database from '../database/Database';
import { ParameterModel } from '../model/Parameter';

export default class Configuration {
  private static PARAMETERS_KEYS = [
    'admin_mode',
    'button_0_pin',
    'button_1_pin',
    'similarity_threshold',
    'dlib_face_predictor_path',
    'dlib_face_recognizer_model_path',
    'webcam_device_id',
    'lock_selector_pins',
    'lock_enable_pin',
    'lock_count',
    'lock_toggle_delay',
  ];
  private database: Database;
  private rawParameters: any;
  private lockCount = 2;
  private lockToggleDelay = 5000;

  constructor(database: Database) {
    this.database = database;
    this.init();
  }

  public getNumLockers() {
    return this.lockCount;
  }

  public getLockerOnTime() {
    return this.lockToggleDelay;
  }

  public getConfigForLocker(): any {
    const data: any = {};
    Configuration.PARAMETERS_KEYS.forEach((key) => {
      data[key] = this.rawParameters.find(
        (param: any) => param.key === key
      ).value;
    });
    return data;
  }

  private async init() {
    const conn = await this.database.getConnection(true);
    try {
      const parameterDao = new ParameterDao(conn);
      this.rawParameters = await parameterDao.getParameters(
        Configuration.PARAMETERS_KEYS
      );
      if (
        this.rawParameters == null ||
        this.rawParameters.length != Configuration.PARAMETERS_KEYS.length
      )
        throw new Error(
          `ERROR::Configuration::init::Not enought parameters ${
            this.rawParameters !== null ? this.rawParameters.length : 0
          }/${Configuration.PARAMETERS_KEYS.length}`
        );
      this.parseParameters(this.rawParameters);
    } catch (error) {
      throw error;
    } finally {
      conn.release();
    }
  }

  private parseParameters(parameters: ParameterModel[]) {
    parameters.forEach((parameter) => {
      switch (parameter.key) {
        case 'admin_mode':
          // this.admin_mode = parameter.value;
          break;
        case 'button_0_pin':
          // this.button_0_pin = parameter.value;
          break;
        case 'button_1_pin':
          // this.button_1_pin = parameter.value;
          break;
        case 'similarity_threshold':
          // this.similarity_threshold = parameter.value;
          break;
        case 'dlib_face_predictor_path':
          // this.dlib_face_predictor_path = parameter.value;
          break;
        case 'dlib_face_recognizer_model_path':
          // this.dlib_face_recognizer_model_path = parameter.value;
          break;
        case 'webcam_device_id':
          // this.webcam_device_id = parameter.value;
          break;
        case 'lock_selector_pins':
          // this.lock_selector_pins = parameter.value;
          break;
        case 'lock_enable_pin':
          // this.lock_enable_pin = parameter.value;
          break;
        case 'lock_count':
          this.lockCount = parseInt(parameter.value);
          break;
        case 'lock_toggle_delay':
          this.lockToggleDelay = parseInt(parameter.value);
          break;
        default:
          console.error(
            `WARNING:Configuration::Unknown parameter ${parameter.key}:${parameter.value}`
          );
      }
    });
  }
}
