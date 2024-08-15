import { IUser } from "@CRUD_PG/@types/user.type";
import { UserRepository } from "@CRUD_PG/database/repositories/user-repository";
import { StatusCode } from "@CRUD_PG/utils/consts";
import { HttpException } from "@CRUD_PG/utils/http-exception";

export class UserService {
  private _userRepository: UserRepository;
  constructor() {
    this._userRepository = new UserRepository();
  }

  async createUser(user: IUser) {
    try {
      const exsitedUser = await this._userRepository.findUserByName(user);
      if (exsitedUser) {
        throw new HttpException("User already exists", StatusCode.Conflict);
      } else {
        const createdUser = await this._userRepository.create(user);
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

  public async getAllUser() {
    try {
      const users = await this._userRepository.findAll();
      return users;
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
