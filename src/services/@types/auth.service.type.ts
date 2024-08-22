import { IJwt, ILoginUser } from "@CRUD_PG/@types/auth.type";
import { IUser } from "@CRUD_PG/@types/user.type";

export interface IAuthService {
  register(user: IUser): Promise<IJwt>; // return jwt token including access and fresh and expire date
  login(user: ILoginUser): Promise<IJwt>; // return jwt token including access and fresh and expire date
  logout(token: string): Promise<void>;
}
