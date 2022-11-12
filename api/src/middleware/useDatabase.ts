import express from 'express';
import Database from '../database/Database';

const useDatabase =
  (db: Database) =>
  (req: express.Request, res: express.Response, next: Function) => {
    req.db = db;
    next();
  };
export default useDatabase;
