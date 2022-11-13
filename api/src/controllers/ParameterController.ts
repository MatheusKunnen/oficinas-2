import { Request, Response } from 'express';
import ParameterDao from '../dao/ParameterDao';
import ErrorResponse from '../error/ErrorResponse';

export default class ParameterController {
  // @description   Returns all parameters
  // @route         GET /parameter
  // @access        Private (user only)
  public async getParameters(
    req: Request,
    res: Response,
    next: Function
  ): Promise<void> {
    if (!req.user) throw new ErrorResponse('Invalid user', 401);
    const conn = await req.db.getConnection();

    try {
      const Parameter = new ParameterDao(conn);
      const parameters = await Parameter.getAllParameters();
      res.status(200).json({ data: parameters });
    } catch (error) {
      throw error;
    } finally {
      conn.release();
    }
    return;
  }

  // @description   Returns parameters for locker
  // @route         GET /parameter/locker
  // @access        Private (localhost only)
  public async getParametersLocker(
    req: Request,
    res: Response,
    next: Function
  ): Promise<void> {
    if (req.hostname === 'localhost')
      res.status(200).json({ ...req.config.getConfigForLocker() });
    else res.status(201).json({});
    return;
  }

  // @description   Update parameter by key
  // @route         PUT /parameter/:key
  // @access        Private (user only)
  public async updateParameter(
    req: Request,
    res: Response,
    next: Function
  ): Promise<void> {
    if (!req.user) throw new ErrorResponse('Invalid user', 401);
    if (req.user.privilege > 0)
      throw new ErrorResponse('Not enougth  privilege', 403);
    if (typeof req.params.key !== 'string' || req.params.key.length <= 0)
      throw new ErrorResponse('Invalid key', 400);
    if (String(req.body.value).length <= 0)
      throw new ErrorResponse('Invalid value', 400);

    const conn = await req.db.getConnection();

    try {
      const Parameter = new ParameterDao(conn);
      await Parameter.updateByKey(req.params.key, req.body.value);
      res.status(200).json({});
    } catch (error) {
      throw error;
    } finally {
      conn.release();
    }
    return;
  }
}
