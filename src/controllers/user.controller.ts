import { SuccessResponse } from "@AUTH/utils/response";

import { UserService } from "@AUTH/services/user-service";

export class UserController  {
  constructor(private readonly userService: UserService) {}

  public async getProfile(userId: string) {
    try {
      console.log("UserID:", userId);
      const profile = await this.userService.getProfile(userId);
      console.log("Profile:");
      return new SuccessResponse("", "", profile);
    } catch (error) {
      throw error;
    }
  }
  public async updateProfile(userId: string, updatedUser: any) {
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
}
