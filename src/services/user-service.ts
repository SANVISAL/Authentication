import { IUser } from "@AUTH/@types/user.type";
import { User } from "@AUTH/database/entities/user.entity";
import { UserRepository } from "@AUTH/database/repositories/user.repository";
import { StatusCode } from "@AUTH/utils/consts";
import { HttpException } from "@AUTH/utils/http-exception";
import { logger } from "@AUTH/utils/logger";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async getProfile(userId: string): Promise<User> {
    try {
      console.log("userId: ", userId);
      const profile = await this.userRepository.findById(userId);
      if (!profile) {
        throw new HttpException("Not Found User!", StatusCode.NotFound);
      }
      return profile;
    } catch (error) {
      logger.info("Get Profile Error", error);
      throw error;
    }
  }
  public async updateProfile(
    userId: string,
    updatedUser: IUser
  ): Promise<IUser> {
    try {
      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw new HttpException("Not Found User!.", StatusCode.NotFound);
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
      logger.info("Update Profile Error", error);
      throw error;
    }
  }
  public async deleteProfile(userId: string) {
    try {
      return await this.userRepository.softDelete(userId);
    } catch (error) {
      throw error;
    }
  }
}
