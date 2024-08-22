// import { ICreateUser } from "@CRUD_PG/@types/user.type";
import { ICreateUser, LoginInfor } from "@CRUD_PG/@types/user.type";
import { ROUTE_PATH } from "@CRUD_PG/routes";
import {
  AuthService,
  // IUser,
} from "@CRUD_PG/services/mock-service.ts/auth-service";
import { ApiError } from "@CRUD_PG/utils/api-error";
import { HttpException } from "@CRUD_PG/utils/http-exception";
import { Body, Delete, Get, Path, Post, Route } from "tsoa";

@Route("/api/v1")
export class UserController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }
  @Post(ROUTE_PATH.CREATE_USER)
  public async createUser(@Body() userDetails: ICreateUser) {
    try {
      console.log("Hello :");
      const user = await this.authService.createUser(userDetails);
      return user;
    } catch (error) {
      console.log("Error :", error);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new ApiError();
    }
  }
  @Get(ROUTE_PATH.GET_ALL_USERS)
  public async getAllUsers() {
    try {
      console.log("fjfjfjf");
      const response = await this.authService.getAllUsers();
      return response;
    } catch (error) {
      console.log("Error :", error);
      console.log("Herre: ++", error);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new ApiError();
    }
  }
  @Delete(ROUTE_PATH.DELETE_USER)
  public async deleteUser(@Path() id: string) {
    try {
      const response = await this.authService.deleteUser(id);
      return response;
    } catch (error) {
      console.log("Error :", error);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new ApiError();
    }
  }
  // @Put(ROUTE_PATH.UPDATE_USER)
  // public async updateUser(@Path() id: string, @Body() userDetails: IUser) {
  //   try {
  //     console.log("Hello :", id);
  //     const response = await this.authService.updateUser(id, userDetails);
  //     return response;
  //   } catch (error) {
  //     console.log("Error :", error);
  //     if (error instanceof HttpException) {
  //       throw error;
  //     }
  //     throw new ApiError();
  //   }
  // }
  @Post(ROUTE_PATH.LOGIN)
  public async login(@Body() loginDetails: LoginInfor) {
    try {
      console.log("login");
      const user = await this.authService.login(loginDetails);
      console.log(user);
      return user;
    } catch (error) {
      console.log("Error :", error);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new ApiError();
    }
  }
}
