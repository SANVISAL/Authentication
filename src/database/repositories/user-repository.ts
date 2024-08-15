import { Repository } from "typeorm";
import User from "../enities/user.entity";
import { AppDataSource } from "../data-source";
import { HttpException } from "@CRUD_PG/utils/http-exception";
import { StatusCode } from "@CRUD_PG/utils/consts";
// import { CreateUser, UserName } from "./@types/user-type-repo";
import { IUser } from "@CRUD_PG/@types/user.type";

export class UserRepository {
  private _repository: Repository<User>;
  private readonly _appDataSource: AppDataSource;
  public constructor() {
    this._appDataSource = AppDataSource.getInstance();
    this._repository = this._appDataSource.getRepository(User);
  }

  async findOne(id: number) {
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
  createUser(user: IUser) {
    try {
      const newUser = this._repository.create(user);
      const saveUser = this._repository.save(newUser);
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
  async findAllUsers() {
    try {
      const users = await this._repository.find();
      if (!users) {
        throw new HttpException("No users found", StatusCode.NotFound);
      }

      return users;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        "Failed to find users",
        StatusCode.InternalServerError
      );
    }
  }
  async deleteUser(id: number) {
    try {
      const deletedUser = await this._repository.delete(id);
      if (deletedUser.affected === 0) {
        throw new HttpException("No user found", StatusCode.NotFound);
      } else {
        return deletedUser.affected;
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        "Failed to delete !",
        StatusCode.InternalServerError
      );
    }
  }

  async updateUser(id: number, updateUser: IUser) {
    try {
      const user = await this._repository.update(id, updateUser);
      if (user.affected === 0) {
        throw new HttpException("No user found", StatusCode.NotFound);
      } else {
        return user.affected;
      }
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

  async findUserByFullName(user: IUser) {
    try {
      const foundUser = await this._repository.findOne({
        where: { firstName: user.firstName, lastName: user.lastName },
      });
      return foundUser || null;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
