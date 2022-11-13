import express from 'express';
import Configuration from '../config/Configuration';
import ParameterController from '../controllers/ParameterController';
import asyncHandler from '../middleware/asyncHandler';
import useUser from '../middleware/useUser';
import Route from './Route';

export default class ParameterRoute extends Route {
  controller: ParameterController;
  constructor(
    config: Configuration,
    app: express.Application,
    appHome: string
  ) {
    super('/parameter', config, app, appHome);
    this.controller = new ParameterController();
    this.loadRouter();
  }

  loadRouter(): void {
    this.router.get(
      '/locker',
      asyncHandler(this.controller.getParametersLocker)
    );
  }
}
