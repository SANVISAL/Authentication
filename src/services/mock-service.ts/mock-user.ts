// import { ICreateUser } from "@CRUD_PG/@types/user.type";
import { ICreateUser } from "@CRUD_PG/@types/user.type";
import { Gender, StatusCode } from "@CRUD_PG/utils/consts";
import { HttpException } from "@CRUD_PG/utils/http-exception";
import { TokenService } from "@CRUD_PG/utils/jwt";
import { logger } from "@CRUD_PG/utils/logger";
import { SuccessResponse } from "@CRUD_PG/utils/response";

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  email: string;
  password: string;
}
export class UserService {
  private _tokenService: TokenService;
  constructor() {
    this._tokenService = new TokenService();
  }
  async createUser(userDetails: ICreateUser) {
    try {
      console.log("Hi");
      logger.info(`SCM server has started with process id ${userDetails}`);
      const user: IUser = {
        id: "12",
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        gender: userDetails.gender,
        email: userDetails.email,
        password: userDetails.password,
      };
      if (!user) {
        throw new HttpException("Created Failse", StatusCode.BadRequest);
      }

      const token = this._tokenService.issueToken(user);
      // console.log(token);
      return new SuccessResponse("", "Created User", token);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        "failed to create user",
        StatusCode.InternalServerError
      );
    }
  }
  async getAllUsers() {
    try {
      const user = "Hello  World";
      if (!user) {
        throw new HttpException("No User Found", StatusCode.NotFound);
      }
      return new SuccessResponse("", "Get Users", user);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        "failed to create user",
        StatusCode.InternalServerError
      );
    }
  }
  async deleteUser(id: string) {
    try {
      if (!id) {
        throw new HttpException("No id found.", StatusCode.BadRequest);
      }
      const user = "None";
      if (!user) {
        throw new HttpException("No User Found", StatusCode.NotFound);
      }
      return new SuccessResponse("", "User Deleted", user);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        "failed to create user",
        StatusCode.InternalServerError
      );
    }
  }
}
