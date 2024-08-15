import { Repository } from "typeorm";
import User from "../enities/user.entity";
import { AppDataSource } from "../data-source";
import { HttpException } from "@CRUD_PG/utils/http-exception";
import { StatusCode } from "@CRUD_PG/utils/consts";
import { IRepository } from "./@types/user-repository.type";
import { IUser, IUserResponse } from "@CRUD_PG/@types/user.type";
import { ApiError } from "@CRUD_PG/utils/api-error";

export class UserRepository implements IRepository {
  private _repository: Repository<User>;
  private readonly _appDataSource: AppDataSource;
  public constructor() {
    this._appDataSource = AppDataSource.getInstance();
    this._repository = this._appDataSource.getRepository(User);
  }

  public async findOne(id: number): Promise<IUserResponse | null> {
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
      throw new ApiError();
    }
  }
  public async create(user: IUser): Promise<IUserResponse> {
    try {
      const createdUser = this._repository.create(user);
      const savedUser = await this._repository.save(createdUser);
      if (!savedUser) {
        throw new HttpException(
          "Could not create user.",
          StatusCode.BadRequest
        );
      }
      return savedUser;
    } catch (error: unknown) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new ApiError();
    }
  }
  public async findAll(): Promise<IUserResponse[]> {
    try {
      const users = await this._repository.find();
      if (users.length === 0) {
        throw new HttpException("No users found", StatusCode.NotFound);
      }

      return users;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new ApiError();
    }
  }
  async delete(id: number): Promise<void> {
    try {
      const deletedUser = await this._repository.delete(id);
      if (deletedUser.affected === 0) {
        throw new HttpException("No user found", StatusCode.NotFound);
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new ApiError();
    }
  }

  async update(id: number, updateUser: Partial<IUser>): Promise<IUserResponse> {
    try {
      const updatedUser = await this._repository.update(id, updateUser);
      if (updatedUser.affected === 0) {
        throw new HttpException("Could not update user.", StatusCode.NotFound);
      }

      const user = await this.findOne(id);

      return user as IUserResponse;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new ApiError();
    }
  }

  async findUserByFullName(user: IUser) {
    try {
      const foundUser = await this._repository.findOne({
        where: { firstName: user.firstName, lastName: user.lastName },
      });
      return foundUser || null;
    } catch (error) {
      throw error;
    }
  }
}
