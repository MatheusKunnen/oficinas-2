import express from 'express';
import Configuration from '../config/Configuration';
import LockerOcupationController from '../controllers/LockerOcupationController';
import asyncHandler from '../middleware/asyncHandler';
import useUser from '../middleware/useUser';
import Route from './Route';

export default class LockerOcupationRoute extends Route {
  controller: LockerOcupationController;
  constructor(
    config: Configuration,
    app: express.Application,
    appHome: string
  ) {
    super('/locker_ocupation', config, app, appHome);
    this.controller = new LockerOcupationController();
    this.loadRouter();
  }

  loadRouter(): void {
    this.router.post('/', asyncHandler(this.controller.create));
    this.router.put(
      '/:id_ocupation/leave',
      asyncHandler(this.controller.leave)
    );
  }
}
