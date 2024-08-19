import { IUser, IUserResponse } from "@CRUD_PG/@types/user.type";
import { UserRepository } from "@CRUD_PG/database/repositories/user-repository";
import { ApiError } from "@CRUD_PG/utils/api-error";
// import { StatusCode } from "@CRUD_PG/utils/consts";
import { HttpException } from "@CRUD_PG/utils/http-exception";
import { IUserService } from "./@types/user-service.type";
import { SuccessResponse } from "@CRUD_PG/utils/response";
import { GenericResponse } from "@CRUD_PG/controllers/@types/controller.type";

export class UserService implements IUserService {
  private _userRepository: UserRepository;
  constructor() {
    this._userRepository = new UserRepository();
  }

  public async getUser(id: string): Promise<SuccessResponse<GenericResponse>> {
    try {
      const user = await this._userRepository.findOne(id);

      return new SuccessResponse("200", "OK", {
        data: user as IUserResponse,
      });
    } catch (error: unknown) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new ApiError();
    }
  }

  public async createUser(
    user: IUser
  ): Promise<SuccessResponse<GenericResponse>> {
    try {
      // const existingUser = await this._userRepository.findUserByFullName(user);
      // if (existingUser) {
      //   throw new HttpException("User already exists", StatusCode.Conflict);
      // }

      const createdUser = await this._userRepository.create(user);
      return new SuccessResponse("200", "OK", {
        data: createdUser as IUserResponse,
      });
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new ApiError();
    }
  }

  public async getAllUsers(): Promise<
    SuccessResponse<{ data: IUserResponse[] }>
  > {
    try {
      const users = await this._userRepository.findAll();
      return new SuccessResponse("200", "OK", {
        data: users as IUserResponse[],
      });
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new ApiError();
    }
  }
  public async deleteUser(id: string): Promise<SuccessResponse<null>> {
    try {
      // check if user exist
      await this._userRepository.findOne(id);

      await this._userRepository.delete(id);

      return new SuccessResponse("200", "OK", null);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new ApiError();
    }
  }
  public async updateUser(
    id: string,
    user: Partial<IUser>
  ): Promise<SuccessResponse<GenericResponse>> {
    try {
      // check if user exist
      await this._userRepository.findOne(id);

      const updatedUser = await this._userRepository.update(id, user);
      return new SuccessResponse("200", "OK", {
        data: updatedUser as IUserResponse,
      });
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new ApiError();
    }
  }
}
