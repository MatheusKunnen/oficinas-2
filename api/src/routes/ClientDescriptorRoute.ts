import express from 'express';
import Configuration from '../config/Configuration';
import ClientDescriptorController from '../controllers/ClientDescriptorController';
import asyncHandler from '../middleware/asyncHandler';
import useUser from '../middleware/useUser';
import Route from './Route';

export default class ClientDescriptorRoute extends Route {
  controller: ClientDescriptorController;
  constructor(
    config: Configuration,
    app: express.Application,
    appHome: string
  ) {
    super('/client_descriptor', config, app, appHome);
    this.controller = new ClientDescriptorController();
    this.loadRouter();
  }

  loadRouter(): void {
    this.router.post('/', asyncHandler(this.controller.create));
    this.router.get(
      '/:id',
      useUser(false),
      asyncHandler(this.controller.getById)
    );
    this.router.get(
      '/:id/image',
      useUser(false),
      asyncHandler(this.controller.getImageById)
    );
  }
}
