import { IUser, IUserResponse } from "@CRUD_PG/@types/user.type";
import { Response } from "express";
// import { SuccessResponse } from "@CRUD_PG/utils/response";

export interface IController {
  getUser(id: number): Promise<IUserResponse>;
  getAllUsers(res: Response): Promise<void>;
  //   createUser(user: IUser): Promise<SuccessResponse<{ data: IUserResponse }>>;
  createUser(user: IUser, res: Response): Promise<void>;
  updateUser(id: number, user: IUser): Promise<IUserResponse>;
  deleteUser(id: number): Promise<void>;
}
