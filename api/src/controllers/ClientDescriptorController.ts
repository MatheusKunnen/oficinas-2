import { Request, Response } from 'express';
import ClientDescriptorDao from '../dao/ClientDescriptorDao';
import ErrorResponse from '../error/ErrorResponse';
import { ClientDescriptor as ClientDescriptorUtils } from '../model/ClientDescriptor';

export default class ClientDescriptorController {
  // @description   Create new client descriptor
  // @route         POST /client_descriptor
  // @access        Private (localhost only)
  public async create(
    req: Request,
    res: Response,
    next: Function
  ): Promise<void> {
    if (req.hostname !== 'localhost')
      throw new ErrorResponse('Endpoint not available', 403);

    const descriptorTmp = ClientDescriptorUtils.validateCreate(req.body);
    const conn = await req.db.getConnection();

    try {
      const ClientDescriptor = new ClientDescriptorDao(conn);
      const id = await ClientDescriptor.create(descriptorTmp);
      // const descriptor = await ClientDescriptor.getById(Number(id));
      // if (descriptor === null) throw new ErrorResponse('Unexpected error', 500);
      res.status(201).json({ data: { id: Number(id) } });
      // .json({ data: ClientDescriptorUtils.sanitizeForJson(descriptor) });
    } catch (err) {
      throw err;
    } finally {
      conn.release();
    }
    return;
  }
  // @description   Returns client descriptor by id
  // @route         GET /client_descriptor/:id
  // @access        Private (localhost & user)
  public async getById(
    req: Request,
    res: Response,
    next: Function
  ): Promise<void> {
    if (req.user === undefined) throw new ErrorResponse('Unauthorized', 401);
    if (req.params && typeof req.params.id !== 'string' && isNaN(req.params.id))
      throw new ErrorResponse('Invalid ID', 400);

    const conn = await req.db.getConnection();

    try {
      const ClientDescriptor = new ClientDescriptorDao(conn);
      const descriptor = await ClientDescriptor.getById(Number(req.params.id));
      if (descriptor === null) throw new ErrorResponse('Not found', 404);
      res
        .status(201)
        .json({ data: ClientDescriptorUtils.sanitizeForJson(descriptor) });
    } catch (err) {
      throw err;
    } finally {
      conn.release();
    }
    return;
  }

  // @description   Returns client descriptor image by id
  // @route         POST /client_descriptor/:id/image
  // @access        Private (user)
  public async getImageById(
    req: Request,
    res: Response,
    next: Function
  ): Promise<void> {
    if (req.user === undefined) throw new ErrorResponse('Unauthorized', 401);
    if (req.params && typeof req.params.id !== 'string' && isNaN(req.params.id))
      throw new ErrorResponse('Invalid ID', 400);

    const conn = await req.db.getConnection();

    try {
      const ClientDescriptor = new ClientDescriptorDao(conn);
      const descriptor = await ClientDescriptor.getById(Number(req.params.id));
      if (descriptor === null) throw new ErrorResponse('Not found', 404);
      const [mime, base64] = descriptor.image.toString().split(',');
      const image = Buffer.from(base64, 'base64');
      res.writeHead(200, {
        'Content-Type': mime.replace('data:', '').replace(';base64', ''),
        'Content-Length': image.length,
      });
      res.end(image);
    } catch (err) {
      throw err;
    } finally {
      conn.release();
    }
    return;
  }
}
