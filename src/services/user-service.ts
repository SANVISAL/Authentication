import { IUser } from "@AUTH/@types/user.type";
import { UserRepository } from "@AUTH/database/repositories/user.repository";
import { StatusCode } from "@AUTH/utils/consts";
import { HttpException } from "@AUTH/utils/http-exception";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async getProfile(userId: string) {
    try {
      console.log("userId: ", userId);
      const profile = await this.userRepository.findById(userId);
      if (!profile) {
        throw new HttpException("Not Found", StatusCode.NotFound);
      }
      return profile;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        "Fail To Get Profile",
        StatusCode.InternalServerError
      );
    }
  }
  public async updateProfile(userId: string, updatedUser: IUser) {
    try {
      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw new HttpException("User not found.", StatusCode.NotFound);
      }
      const updateUser = await this.userRepository.updateById(
        user.id,
        updatedUser
      );
      if (!updateUser) {
        throw new HttpException(
          "Failed to update user.",
          StatusCode.BadRequest
        );
      }
      return updateUser;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        "Fail To Update Profile",
        StatusCode.InternalServerError
      );
    }
  }
}
