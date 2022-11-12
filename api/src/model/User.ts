export interface UserModel {
  id: number;
  username: string;
  password: string;
  privilege: number;
  active: boolean;
  last_login: Date;
}
