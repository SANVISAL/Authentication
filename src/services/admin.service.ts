import { IUser } from "@AUTH/@types/user.type";
import { User } from "@AUTH/database/entities/user.entity";
import { UserRepository } from "@AUTH/database/repositories/user.repository";
import { StatusCode } from "@AUTH/utils/consts";
import { HttpException } from "@AUTH/utils/http-exception";
import { logger } from "@AUTH/utils/logger";

export class AdminService {
  constructor(private readonly userRepository: UserRepository) {}
  public async getAllUsers(): Promise<User[]> {
    try {
      const users = await this.userRepository.findAll();
      if (!users || users.length === 0) {
        throw new HttpException("No users found.", StatusCode.NotFound);
      }
      return users;
    } catch (error) {
      logger.error(`An error occurred while get all users. Errror ${error}`);
      throw error;
    }
  }
  public async getUserById(userId: string): Promise<IUser> {
    try {
      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw new HttpException("User not found.", StatusCode.NotFound);
      }
      return user;
    } catch (error) {
      logger.error(`An error occurred while get user by id. Errror ${error}`);
      throw error;
    }
  }
  public deleteUser(userId: string) {
    try {
      return this.userRepository.softDelete(userId);
    } catch (error) {
      logger.error(`An error occurred while delete user. Errror ${error}`);
      throw error;
    }
  }
}
