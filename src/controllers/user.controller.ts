import { IUser } from "@CRUD_PG/@types/user.type";
import { UserService } from "@CRUD_PG/services/user-service";
import { StatusCode } from "@CRUD_PG/utils/consts";
import { HttpException } from "@CRUD_PG/utils/http-exception";
import {
  Body,
  Delete,
  Get,
  Post,
  Route,
  Path,
  SuccessResponse,
  Put,
  Middlewares,
} from "tsoa";
import { ROUTE_PATH } from "@CRUD_PG/routes";
import { ApiError } from "@CRUD_PG/utils/api-error";
import { inputValidator } from "@CRUD_PG/middlewares/validate-input";
import { UserSchema } from "@CRUD_PG/schemas/user.schema";

@Route("/api/v1")
export class UserController {
  private _userService: UserService;

  constructor() {
    this._userService = new UserService();
  }

  @SuccessResponse(StatusCode.Created, "OK")
  @Middlewares(inputValidator(UserSchema))
  @Post(ROUTE_PATH.CREATE_USER)
  public async createUser(@Body() user: IUser) {
    try {
      const response = await this._userService.createUser(user);

      return response;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new ApiError();
    }
  }

  @Get(ROUTE_PATH.GET_USER)
  public async getUser(id: number) {
    try {
      if (!id) {
        throw new HttpException("No id found.", StatusCode.OK);
      }

      const response = await this._userService.getUser(id);

      return response;
    } catch (error: unknown) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new ApiError();
    }
  }

  @Get(ROUTE_PATH.GET_ALL_USERS)
  public async getAllUsers() {
    try {
      const response = await this._userService.getAllUsers();

      return response;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new ApiError();
    }
  }

  @Delete(ROUTE_PATH.DELETE_USER)
  public async deleteUser(@Path() id: number) {
    try {
      if (!id) {
        throw new HttpException("No id found.", StatusCode.NotFound);
      }
      const response = await this._userService.deleteUser(id);

      return response;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new ApiError();
    }
  }

  @Put(ROUTE_PATH.UPDATE_USER)
  @Middlewares(inputValidator(UserSchema))
  public async updateUser(@Path() id: number, @Body() user: Partial<IUser>) {
    try {
      if (!id) {
        throw new HttpException("No id found.", StatusCode.NotFound);
      }
      const response = await this._userService.updateUser(id, user);

      return response;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new ApiError();
    }
  }
}
