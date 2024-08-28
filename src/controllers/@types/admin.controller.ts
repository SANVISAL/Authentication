import { UserProfileDTO } from "@AUTH/dto/user.dto";
import { SuccessResponse } from "@AUTH/utils/response";

export interface IAdminController {
  getAllUsers(): Promise<SuccessResponse<UserProfileDTO[]>>;
  getUser(
    userId: string,
    req: Express.Request
  ): Promise<SuccessResponse<UserProfileDTO>>;
  deleteUser(userId: string): Promise<SuccessResponse<null>>;
}
