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
