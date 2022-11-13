import { Request, Response } from 'express';
import LockerOcupationDao from '../dao/LockerOcupationdao';
import LockerOcupationDescriptorDao from '../dao/LockerOcupationDescriptorDao';
import ErrorResponse from '../error/ErrorResponse';

export default class LockerOcupationController {
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
    if (
      typeof req.body.id_descriptor === 'undefined' ||
      isNaN(req.body.id_descriptor)
    )
      throw new ErrorResponse('Invalid descriptor', 400);

    const id_ocupation = Number(req.params.id_ocupation);

    const conn = await req.db.getConnection();
    await conn.startTransaction();

    try {
      const LockerOcupation = new LockerOcupationDao(conn);
      const LockerOcupationDescriptor = new LockerOcupationDescriptorDao(conn);

      await LockerOcupation.leave(id_ocupation);

      const id_ocupation_descriptor = await LockerOcupationDescriptor.create({
        id_descriptor: req.body.id_descriptor,
        id_ocupation: String(id_ocupation),
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
}
