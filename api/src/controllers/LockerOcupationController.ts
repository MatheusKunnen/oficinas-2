import { Request, Response } from 'express';
import LockerOcupationDao from '../dao/LockerOcupationDao';
import LockerOcupationDescriptorDao from '../dao/LockerOcupationDescriptorDao';
import ErrorResponse from '../error/ErrorResponse';

export default class LockerOcupationController {
  // @description   Gets lockers
  // @route         GET /locker_ocupation?id_locker=
  // @access        Private user
  public async getLockersOcupation(
    req: Request,
    res: Response,
    next: Function
  ): Promise<void> {
    let id_locker = 0;
    if (!req.user) throw new ErrorResponse('Invalid user', 403);
    if (!isNaN(Number(req.query.id_locker)))
      id_locker = Number(req.query.id_locker);

    const conn = await req.db.getConnection();

    try {
      const LockerOcupation = new LockerOcupationDao(conn);

      const data = await LockerOcupation.getOcupationByLockerId(id_locker);

      res.status(200).json({ data: data });
    } catch (error) {
      throw error;
    } finally {
      conn.release();
    }
    return;
  }

  // @description   Gets locker ocupation status
  // @route         GET /locker_ocupation/in_use
  // @access        Private (user & localhost)
  public async getStatus(
    req: Request,
    res: Response,
    next: Function
  ): Promise<void> {
    if (!req.user && req.hostname !== 'localhost')
      throw new ErrorResponse('Invalid client', 403);

    const conn = await req.db.getConnection();

    try {
      const LockerOcupation = new LockerOcupationDao(conn);

      const data = await LockerOcupation.getOcupations(
        req.config.getNumLockers()
      );

      res.status(200).json({ data: data });
    } catch (error) {
      throw error;
    } finally {
      conn.release();
    }
    return;
  }

  // @description   Register locker ocupation
  // @route         POST /locker_ocupation
  // @access        Private (localhost only)
  public async create(
    req: Request,
    res: Response,
    next: Function
  ): Promise<void> {
    if (req.hostname !== 'localhost')
      throw new ErrorResponse('Invalid client', 403);
    if (typeof req.body.id_locker === 'undefined' || isNaN(req.body.id_locker))
      throw new ErrorResponse('Invalid locker', 400);
    if (
      typeof req.body.id_descriptor === 'undefined' ||
      isNaN(req.body.id_descriptor)
    )
      throw new ErrorResponse('Invalid descriptor', 400);
    const conn = await req.db.getConnection();
    await conn.startTransaction();

    try {
      const LockerOcupation = new LockerOcupationDao(conn);
      const LockerOcupationDescriptor = new LockerOcupationDescriptorDao(conn);

      const ocupation = await LockerOcupation.getOcupationByLockerId(
        req.body.id_locker,
        true
      );
      if (ocupation !== null)
        throw new ErrorResponse('Locker already in use', 400);

      const id_ocupation = await LockerOcupation.create({
        id_locker: req.body.id_locker,
      });

      if (id_ocupation === null)
        throw new ErrorResponse('Unexpected error', 500);

      const id_ocupation_descriptor = await LockerOcupationDescriptor.create({
        id_descriptor: req.body.id_descriptor,
        id_ocupation,
      });

      if (id_ocupation_descriptor === null)
        throw new ErrorResponse('Unexpected error', 500);

      await conn.commit();
      res.status(200).json({ data: { id_ocupation, id_ocupation_descriptor } });
    } catch (error) {
      throw error;
    } finally {
      if (conn.isInTransaction()) await conn.rollback();
      conn.release();
    }
    return;
  }

  // @description   Register locker ocupation
  // @route         PUT /locker_ocupation/:id_ocupation/leave
  // @access        Private (localhost only)
  public async leave(
    req: Request,
    res: Response,
    next: Function
  ): Promise<void> {
    if (req.hostname !== 'localhost')
      throw new ErrorResponse('Invalid client', 403);
    if (isNaN(Number(req.params.id_ocupation)))
      throw new ErrorResponse('Invalid ocupation', 400);

    const id_ocupation = Number(req.params.id_ocupation);

    const conn = await req.db.getConnection();
    await conn.startTransaction();

    try {
      const LockerOcupation = new LockerOcupationDao(conn);
      const LockerOcupationDescriptor = new LockerOcupationDescriptorDao(conn);

      await LockerOcupation.leave(id_ocupation);

      let id_ocupation_descriptor = undefined;
      if (
        typeof req.body.id_descriptor === 'string' &&
        req.body.id_descriptor.length > 0
      ) {
        id_ocupation_descriptor = await LockerOcupationDescriptor.create({
          id_descriptor: req.body.id_descriptor,
          id_ocupation: String(id_ocupation),
        });

        if (id_ocupation_descriptor === null)
          throw new ErrorResponse('Unexpected error', 500);
      }
      await conn.commit();
      res.status(200).json({ data: { id_ocupation, id_ocupation_descriptor } });
    } catch (error) {
      throw error;
    } finally {
      if (conn.isInTransaction()) await conn.rollback();
      conn.release();
    }
    return;
  }

  // @description   Gets lockers statistics
  // @route         GET /locker_ocupation/statistics?days=
  // @access        Private user
  public async getStatistics(
    req: Request,
    res: Response,
    next: Function
  ): Promise<void> {
    let days = 30;
    if (!req.user) throw new ErrorResponse('Invalid user', 403);
    if (!isNaN(Number(req.query.days))) days = Number(req.query.days);
    const conn = await req.db.getConnection();

    try {
      const LockerOcupation = new LockerOcupationDao(conn);

      const data = await LockerOcupation.getStatistics(days);

      res.status(200).json({ data: data });
    } catch (error) {
      throw error;
    } finally {
      conn.release();
    }
    return;
  }
}
