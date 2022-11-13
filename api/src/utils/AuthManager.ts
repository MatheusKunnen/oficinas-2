import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { UserModel as User } from '../model/User';

export default class AuthManager {
  private static DefaultInstance: AuthManager | null = null;
  private passwordSecret: string;
  private jwtSecret: string;

  constructor(passwordSecret: string, jwtSecret: string) {
    this.passwordSecret = passwordSecret;
    this.jwtSecret = jwtSecret;
  }

  public getPasswordHash(password: string): string {
    return crypto
      .createHash('sha512')
      .update(this.passwordSecret)
      .update(password)
      .digest('base64');
  }

  public isValidPassword(user: User, password: string) {
    const pw_hash = this.getPasswordHash(password);
    return pw_hash === user.password;
  }

  public getUserJwt(user: User, expiresIn: string | number = '24h') {
    return jwt.sign({ id: user.id, username: user.username }, this.jwtSecret, {
      expiresIn,
    });
  }

  public getJwtPayload(token: string) {
    return jwt.verify(token, this.jwtSecret);
  }

  public static setDefault(pm: AuthManager) {
    AuthManager.DefaultInstance = pm;
  }

  public static getDefault(): AuthManager {
    if (AuthManager.DefaultInstance === null)
      throw new Error(`ERROR::AuthManager::Not ready yet.`);
    return AuthManager.DefaultInstance;
  }
}
