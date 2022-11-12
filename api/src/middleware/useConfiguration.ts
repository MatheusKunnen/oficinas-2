import express from 'express';
import Configuration from '../config/Configuration';

const useConfiguration =
  (config: Configuration) =>
  (req: express.Request, res: express.Response, next: Function) => {
    req.config = config;
    next();
  };
export default useConfiguration;
