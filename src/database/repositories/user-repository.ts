import { Repository } from "typeorm";
import User from "../enities/user.entity";
import { AppDataSource } from "../data-source";
import { HttpException } from "@CRUD_PG/utils/http-exception";
import { StatusCode } from "@CRUD_PG/utils/consts";
import { IRepository } from "./@types/user-repository.type";
import { IUser, IUserResponse } from "@CRUD_PG/@types/user.type";

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
      throw new HttpException(
        "Unexpected error accurred.",
        StatusCode.InternalServerError
      );
    }
  }
  public async create(user: IUser): Promise<IUserResponse> {
    try {
      const createdUser = this._repository.create(user);
      const savedUser = await this._repository.save(createdUser);
      if (!savedUser) {
        throw new HttpException("Failed to save user", StatusCode.BadRequest);
      }
      return savedUser;
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
  public async findAll(): Promise<IUserResponse[]> {
    try {
      const users = await this._repository.find();

      if (users.length === 0) {
        throw new HttpException("Users not found.", StatusCode.NotFound);
      }

      return users;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        "An unexpected error occurred",
        StatusCode.InternalServerError
      );
    }
  }

  findUserByName(user: IUser) {
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
