import ErrorResponse from '../error/ErrorResponse';

export interface UserModel {
  id: number;
  username: string;
  password: string;
  privilege: number;
  active: boolean;
  last_login: Date;
}

export class User {
  public static validateCreateUser(user: any) {
    if (typeof user.username !== 'string' || user.username.length <= 0)
      throw new ErrorResponse(`Username invalid`, 400);
    if (typeof user.password !== 'string' || user.password.length <= 0)
      throw new ErrorResponse(`Password invalid`, 400);
    if (isNaN(Number(user.privilege)))
      throw new ErrorResponse(`Privilege invalid`, 400);
    return true;
  }
}
