import { IJwt, ILoginUser } from "@AUTH/@types/auth.type";
import { IUser } from "@AUTH/@types/user.type";
import { ApiResponse } from "@AUTH/utils/@types/response.type";
import { SuccessResponse } from "@AUTH/utils/response";

export interface IAuthResponse extends ApiResponse<IJwt> {}

export interface IAuthController {
  register(user: IUser, role :string): Promise<IAuthResponse>;
  login(user: ILoginUser): Promise<IAuthResponse>;
  logout(id: string): Promise<SuccessResponse<null>>;
}
