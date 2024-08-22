import { Gender } from "@CRUD_PG/utils/consts/enum-column";

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

export interface ICreateUser {
  id?: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  email: string;
  password: string;
}

export interface LoginInfor {
  email: string;
  password: string;
}
