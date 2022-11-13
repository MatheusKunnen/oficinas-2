import { Request, Response } from 'express';
import UserDao from '../dao/UserDao';
import ErrorResponse from '../error/ErrorResponse';
import { User } from '../model/User';
import AuthManager from '../utils/AuthManager';

export default class UserController {
  public async create(
    req: Request,
    res: Response,
    next: Function
  ): Promise<void> {
    User.validateCreateUser(req.body);
    const conn = await req.db.getConnection();

    try {
      const User = new UserDao(conn);
      await User.create({
        ...req.body,
        privilege:
          req.body.privilege >= req.user.privilege
            ? req.body.privilege
            : req.user.privilege,
        password: AuthManager.getDefault().getPasswordHash(req.body.password),
      });
      res.status(201).json({});
    } catch (err) {
      throw err;
    } finally {
      conn.release();
    }
    return;
  }

  public async login(
    req: Request,
    res: Response,
    next: Function
  ): Promise<void> {
    if (req.user === undefined) throw new ErrorResponse('Invalid login', 401);
    const token = AuthManager.getDefault().getUserJwt(req.user);
    res.status(200).json({ token: `Bearer ${token}` });
    return;
  }

  public async getMe(
    req: Request,
    res: Response,
    next: Function
  ): Promise<void> {
    if (req.user === undefined) throw new ErrorResponse('Invalid user', 401);

    const conn = await req.db.getConnection();

    try {
      const User = new UserDao(conn);
      const user = await User.getByUsername(req.user.username);
      res.status(201).json({ ...user, password: undefined });
    } catch (err) {
      throw err;
    } finally {
      conn.release();
    }

    return;
  }
}
