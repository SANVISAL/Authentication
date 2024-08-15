import { IUser, IUserResponse } from "@CRUD_PG/@types/user.type";
import User from "@CRUD_PG/database/enities/user.entity";
export interface UserCreate extends Partial<User> {
  firstname: string;
  lastname: string;
}

export interface UserName extends Partial<User> {
  firstname: string;
  lastname: string;
}

export interface IRepository {
  findOne(id: number): Promise<IUserResponse | null>;
  findAll(): Promise<IUserResponse[]>;
  create(user: IUser): Promise<IUserResponse>;
  // update(id: number, user: IUser): Promise<IUserResponse>;
  // delete(id: number): Promise<void>;
}
