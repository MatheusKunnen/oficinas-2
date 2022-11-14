import express from 'express';
import UserDao from '../dao/UserDao';
import ErrorResponse from '../error/ErrorResponse';
import AuthManager from '../utils/AuthManager';
import asyncHandler from './asyncHandler';

const useUserAuth = (validate: boolean = true) =>
  asyncHandler(
    async (req: express.Request, res: express.Response, next: Function) => {
      const authorization =
        typeof req.headers['authorization'] === 'string'
          ? req.headers['authorization']
          : req.headers['Authorization'];

      if (typeof authorization !== 'string') {
        if (validate) {
          throw new ErrorResponse('Invalid User', 401);
        } else return next();
      }

      const [type, token] = authorization.split(' ');
      let user = undefined;

      const authManager = AuthManager.getDefault();
      const conn = await req.db.getConnection();

      try {
        const User = new UserDao(conn);
        if (type === 'Basic') {
          const [alias, pass] = Buffer.from(token, 'base64')
            .toString('utf8')
            .split(':');
          user = await User.getByUsername(alias);
          if (user && (await authManager.isValidPassword(user, pass))) {
          } else {
            user = undefined;
          }
        } else if (type === 'Bearer') {
          try {
            const usrToken = await authManager.getJwtPayload(token);
            user = await User.getByUsername(
              String(
                typeof usrToken === 'string' ? usrToken : usrToken.username
              )
            );
          } catch (error) {
            if (validate) throw error;
            else user = undefined;
          }
        }

        if (validate && !user?.active)
          throw new ErrorResponse('Invalid User', 401);

        req.user = user ? user : undefined;
        return next();
      } catch (error: any) {
        throw new ErrorResponse('Invalid User', 401);
      } finally {
        await conn?.release();
      }
    }
  );

export default useUserAuth;
