import { Gender } from "@CRUD_PG/utils/consts/enum-column";

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  gender: Gender;
}

export interface IUserResponse extends IUser {
  id: string;
}
