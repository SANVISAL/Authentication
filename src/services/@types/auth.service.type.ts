import { IJwt, ILoginUser } from "@AUTH/@types/auth.type";
import { IUser } from "@AUTH/@types/user.type";

export interface IAuthService {
  register(user: IUser,rolee :string): Promise<IJwt>; // return jwt token including access and fresh and expire date
  login(user: ILoginUser): Promise<IJwt>; // return jwt token including access and fresh and expire date
  logout(token: string): Promise<void>;
}
