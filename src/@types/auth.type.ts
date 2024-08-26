import { Roles } from "@AUTH/utils/consts";
import { IUser } from "./user.type";
import { JwtPayload } from "jsonwebtoken";

export interface ILoginUser {
  email: string;
  password: string;
}

export interface IRegisterUser extends IUser {
  role: Roles;
}

export interface IJwt {
  accessToken: string;
  refreshToken: string;
  expireAt: Date;
}

export interface TokenPayload extends JwtPayload {
  sub: string;
  name: string;
  aud: string;
  scope: string;
  roles: string;
  iat?: number;
  exp?: number;
  jti: string;
  email: string;
}
