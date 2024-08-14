import { Repository } from "typeorm";
import User from "../enities/model-user";
import { AppDataSource } from "../data-source";
import { HttpException } from "@CRUD_PG/utils/http-exception";
import { StatusCode } from "@CRUD_PG/utils/consts";
import { UserCreate, UserName } from "./@types/user-type-repo";

export class UserRepository {
  private _repository: Repository<User>;
  private readonly _appDataSource: AppDataSource;
  public constructor() {
    this._appDataSource = AppDataSource.getInstance();
    this._repository = this._appDataSource.getRepository(User);
  }

  findOne(id: number) {
    try {
      const user = this._repository.findOne({
        where: [
          {
            id,
          },
        ],
      });
      if (!user) {
        throw new HttpException("No user found.", StatusCode.NotFound);
      }
      return user;
    } catch (error: unknown) {
      if (error instanceof HttpException) {
        throw error;
      }
    }
  }
  createUser(user: UserCreate) {
    try {
      const userCreate = this._repository.create(user);
      const saveUser = this._repository.save(userCreate);
      if (!saveUser) {
        throw new HttpException("Failed to save user", StatusCode.BadRequest);
      } else {
        return saveUser;
      }
    } catch (error: unknown) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        "An unexpected error occurred",
        StatusCode.InternalServerError
      );
    }
  }
  findAllUsers() {
    try {
      const allUsers = this._repository.find();
      return allUsers;
    } catch (error) {
      throw error;
    }
  }

  findUserByName(user: UserName) {
    try {
      const foundUser = this._repository.findOne({
        where: { firstName: user.firstName, lastName: user.lastName },
      });
      return foundUser || null;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
