import { Router as ExpressRouter, Application, RouterOptions } from 'express';
import Configuration from '../config/Configuration';

export default abstract class Route {
  protected config: Configuration;
  protected app: Application;
  protected router: ExpressRouter;
  protected appHome: string;
  protected basePath: String;
  constructor(
    basePath: String,
    config: Configuration,
    app: Application,
    appHome: string,
    routerParams?: RouterOptions | undefined
  ) {
    this.basePath = basePath;
    this.config = config;
    this.app = app;
    this.appHome = appHome;
    this.router = ExpressRouter(routerParams);
  }

  protected abstract loadRouter(): void;

  public initRouter(): void {
    this.app.use(
      `${this.appHome != '/' ? this.appHome : ''}${this.basePath}`,
      this.router
    );
  }

  public getRouter(): ExpressRouter {
    return this.router;
  }
}
