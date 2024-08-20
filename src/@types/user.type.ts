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
