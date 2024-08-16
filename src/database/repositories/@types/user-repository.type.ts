import { IUser, IUserResponse } from "@CRUD_PG/@types/user.type";
import User from "@CRUD_PG/database/enities/user.entity";
export interface UserCreate extends Partial<User> {
  firstname: string;
  lastname: string;
}

export interface QueryParams extends Partial<IUser> {}

export interface IRepository {
  findOne(id: string): Promise<IUserResponse | null>;
  findAll(): Promise<IUserResponse[]>;
  create(user: IUser): Promise<IUserResponse>;
  update(id: string, user: Partial<IUser>): Promise<IUserResponse>;
  delete(id: string): Promise<void>;
}
