import { IUser, IUserResponse } from "@CRUD_PG/@types/user.type";
import { GenericResponse } from "@CRUD_PG/controllers/@types/controller.type";
import { SuccessResponse } from "@CRUD_PG/utils/response";

export interface IUserService {
  getUser(id: number): Promise<SuccessResponse<GenericResponse>>;
  getAllUsers(): Promise<SuccessResponse<{ data: IUserResponse[] }>>;
  createUser(user: IUser): Promise<SuccessResponse<GenericResponse>>;
  updateUser(
    id: number,
    user: Partial<IUser>
  ): Promise<SuccessResponse<GenericResponse>>;
  deleteUser(id: number): Promise<SuccessResponse<null>>;
}
