import { IUser } from "@CRUD_PG/@types/user.type";
import { UserRepository } from "@CRUD_PG/database/repositories/user-repository";
import { StatusCode } from "@CRUD_PG/utils/consts";
import { HttpException } from "@CRUD_PG/utils/http-exception";

class UserService {
  private _userRepository: UserRepository;
  constructor() {
    this._userRepository = new UserRepository();
  }

  async createUser(user: IUser) {
    try {
      const existingUser = await this._userRepository.findUserByFullName(user);
      if (existingUser) {
        throw new HttpException("User already exists", StatusCode.Conflict);
      } else {
        const createdUser = this._userRepository.createUser(user);
        return createdUser;
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        "occurred error creating user",
        StatusCode.InternalServerError
      );
    }
  }

  async getAllUsers() {
    try {
      const user = await this._userRepository.findAllUsers();
      if (user.length === 0) {
        throw new HttpException("No user found", StatusCode.NotFound);
      }
      return user;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        "Faile to get user!",
        StatusCode.InternalServerError
      );
    }
  }
  async deleteUser(id: number) {
    try {
      const userId = await this._userRepository.findOne(id);
      if (!userId) {
        throw new HttpException("User not found", StatusCode.NotFound);
      }
      const deletedUser = await this._userRepository.deleteUser(id);
      return deletedUser;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        "Failed to delete user",
        StatusCode.InternalServerError
      );
    }
  }
  async updateUser(id: number, user: IUser) {
    try {
      const exsitedUser = await this._userRepository.findOne(id);
      if (!exsitedUser) {
        throw new HttpException("User not found", StatusCode.NotFound);
      }
      const userDetails = {
        firstName: user.firstName,
        lastName: user.lastName,
      };
      // user.firstName = exsitedUser.firstName;
      // user.lastName = exsitedUser.lastName;

      const updatedUser = await this._userRepository.updateUser(
        exsitedUser.id,
        userDetails
      );
      return updatedUser;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        "Failed to update user",
        StatusCode.InternalServerError
      );
    }
  }
}

export default UserService;
