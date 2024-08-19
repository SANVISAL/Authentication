import { IUser, IUserResponse } from "@CRUD_PG/@types/user.type";
import { GenericResponse } from "@CRUD_PG/controllers/@types/controller.type";
import { SuccessResponse } from "@CRUD_PG/utils/response";

export interface IUserService {
  getUser(id: string): Promise<SuccessResponse<GenericResponse>>;
  getAllUsers(): Promise<SuccessResponse<{ data: IUserResponse[] }>>;
  createUser(user: IUser): Promise<SuccessResponse<GenericResponse>>;
  updateUser(
    id: string,
    user: Partial<IUser>
  ): Promise<SuccessResponse<GenericResponse>>;
  deleteUser(id: string): Promise<SuccessResponse<null>>;
}
