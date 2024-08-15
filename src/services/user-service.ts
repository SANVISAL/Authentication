import { UserCreate } from "@CRUD_PG/database/repositories/@types/user-type-repo";
import { UserRepository } from "@CRUD_PG/database/repositories/user-repository";
import { StatusCode } from "@CRUD_PG/utils/consts";
import { HttpException } from "@CRUD_PG/utils/http-exception";

class UserService {
  private _userRepository: UserRepository;
  constructor() {
    this._userRepository = new UserRepository();
  }

  async createUser(user: UserCreate) {
    try {
      const exsitedUser = await this._userRepository.findUserByName(user);
      if (exsitedUser) {
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

  async getAllUser() {
    try {
      const user = await this._userRepository.findAllUsers();
      if (!user) {
        throw new HttpException("No user found", StatusCode.NotFound);
      }
      return user;
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
}

export default UserService;
