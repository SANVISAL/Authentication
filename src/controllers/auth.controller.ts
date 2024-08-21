// import { IUser } from "@CRUD_PG/@types/user.type";

// import { StatusCode } from "@CRUD_PG/utils/consts";

import { IUser } from "@CRUD_PG/@types/user.type";
import { ROUTE_PATH } from "@CRUD_PG/routes";
import { AuthService } from "@CRUD_PG/services/auth-service";
import { ApiError } from "@CRUD_PG/utils/api-error";
import { StatusCode } from "@CRUD_PG/utils/consts";
import { HttpException } from "@CRUD_PG/utils/http-exception";
import { Body, Get, Post, Route } from "tsoa";
import Container from "typedi";
// import Container from "typedi";

@Route("api/v1")
export class AuthController {
  private authService: AuthService;

  constructor() {
    // Injecting the AuthService using TypeDI Container
    this.authService = Container.get(AuthService);
  }
  @Post(ROUTE_PATH.CREATE_USER)
  public async register(@Body() user: IUser) {
    console.log("Register", user);
    try {
      if (!user) {
        throw new HttpException(
          "Invalid Email Or Password.",
          StatusCode.BadRequest
        );
      }
      const response = await this.authService.register(user);
      return response;
    } catch (error) {
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
}
