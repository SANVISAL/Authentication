import { IJwt, ILoginUser } from "@CRUD_PG/@types/auth.type";
import { IUser } from "@CRUD_PG/@types/user.type";
import { ApiResponse } from "@CRUD_PG/utils/@types/response.type";
import { SuccessResponse } from "@CRUD_PG/utils/response";

export interface IAuthResponse extends ApiResponse<IJwt> {}

export interface IAuthController {
  register(user: IUser): Promise<IAuthResponse>;
  login(user: ILoginUser): Promise<IAuthResponse>;
  logout(id: string): Promise<SuccessResponse<null>>;
}
