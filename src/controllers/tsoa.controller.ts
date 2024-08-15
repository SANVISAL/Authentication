import { IUser } from "@CRUD_PG/@types/user.type";
import { UserService } from "@CRUD_PG/services/user-service";
import { StatusCode } from "@CRUD_PG/utils/consts";
import { HttpException } from "@CRUD_PG/utils/http-exception";
import { SuccessResponse } from "@CRUD_PG/utils/response";
import { Response } from "express";
import { IController } from "./@types/controller.type";
import { Body, Get, Post, Res, Route } from "tsoa";
import { ROUTE_PATH } from "@CRUD_PG/routes";

@Route(ROUTE_PATH.BASE_PATH)
export class UserController implements IController {
  private _userService: UserService;

  constructor() {
    this._userService = new UserService();
  }

  @Post(ROUTE_PATH.USERS)
  public async createUser(
    @Body() user: IUser,
    @Res() res: Response
  ): Promise<void> {
    try {
      const createdUser = await this._userService.createUser(user);

      res.json(StatusCode.Created).json(
        new SuccessResponse("201", "Created", {
          data: createdUser,
        })
      );
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        "Unexpected error accurred.",
        StatusCode.InternalServerError
      );
    }
  }

  @Get(ROUTE_PATH.All_USER)
  public async getAllUsers(@Res() res: Response): Promise<void> {
    try {
      const users = await this._userService.getAllUser();

      res.status(StatusCode.OK).json(
        new SuccessResponse("200", "OK", {
          data: users,
        })
      );
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        "Unexpected erro accurred.",
        StatusCode.InternalServerError
      );
    }
  }
}
