import { Request, Response } from 'express';

export default class ParameterController {
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
}
