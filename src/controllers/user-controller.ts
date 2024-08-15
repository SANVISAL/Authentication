import { IUser } from "@CRUD_PG/@types/user.type";
import { UserService } from "@CRUD_PG/services/user-service";
import { StatusCode } from "@CRUD_PG/utils/consts";
import { HttpException } from "@CRUD_PG/utils/http-exception";
import { SuccessResponse } from "@CRUD_PG/utils/response";
import { Request, Response, NextFunction } from "express";

export class UserController {
  private _userService: UserService;

  constructor() {
    this._userService = new UserService();
  }

  public async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user: IUser = req.body;

      if (!user.firstName || !user.lastName) {
        throw new HttpException("Name is required", StatusCode.BadRequest);
      }

      const userCreate = await this._userService.createUser(user)

      res
        .status(201)
        .json(
          new SuccessResponse(
            "USER_CREATED",
            "User created successfully",
            userCreate
          )
        );
    } catch (error) {
      if(error instanceof HttpException){
       next(error)
      }
      throw new HttpException("Unexpected error accurred.", StatusCode.InternalServerError)
    }
  }

  public async getAllUsers(_req: Request, res: Response, next: NextFunction) {
    try {
      console.log("user service", this._userService);
      const users = await this._userService.getAllUser();

      res.status(StatusCode.OK).json(
        new SuccessResponse("200", "OK", {
          data: users,
        })
      );
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      next(error);
    }
  }
}
