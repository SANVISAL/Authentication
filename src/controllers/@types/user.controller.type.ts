import { IUpdateUser } from "@AUTH/@types/user.type";
import { UserProfileDTO } from "@AUTH/dto/user.dto";
import { SuccessResponse } from "@AUTH/utils/response";

export interface IUserController {
  getProfile(req: Express.Request): Promise<SuccessResponse<UserProfileDTO>>;
  updateProfile(
    req: Express.Request,
    user: Partial<IUpdateUser>
  ): Promise<SuccessResponse<UserProfileDTO>>;
}
