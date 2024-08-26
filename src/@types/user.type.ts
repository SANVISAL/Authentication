import { Gender } from "@AUTH/utils/consts";

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  gender: Gender;
  password: string;
}

export interface IUserResponse extends IUser {
  id: string;
}

export interface ICreateUser extends IUser {
  id: string;
  role: string;
}

export interface LoginInfor {
  email: string;
  password: string;
}
