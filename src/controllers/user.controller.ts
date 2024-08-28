import { SuccessResponse } from "@AUTH/utils/response";
import { UserService } from "@AUTH/services/user-service";
import { IUser } from "@AUTH/@types/user.type";
import { User } from "@AUTH/database/entities/user.entity";

export class UserController {
  constructor(private readonly userService: UserService) {}

  public async getProfile(userId: string): Promise<SuccessResponse<User>> {
    try {
      console.log("UserID:", userId);
      const profile = await this.userService.getProfile(userId);
      console.log("Profile:");
      return new SuccessResponse("", "", profile);
    } catch (error) {
      throw error;
    }
  }
  public async updateProfile(
    userId: string,
    updatedUser: IUser
  ): Promise<SuccessResponse<IUser>> {
    try {
      const updatedProfile = await this.userService.updateProfile(
        userId,
        updatedUser
      );
      return new SuccessResponse("", "", updatedProfile);
    } catch (error) {
      throw error;
    }
  }

  public async deleteProfile(userId: string): Promise<SuccessResponse<null>> {
    try {
      await this.userService.deleteProfile(userId);
      return new SuccessResponse("200", "Profile deleted successfully", null);
    } catch (error) {
      throw error;
    }
  }
}
