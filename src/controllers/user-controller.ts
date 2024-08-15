// import { CreateUser } from "@CRUD_PG/database/repositories/@types/user-type-repo";
import { IUser } from "@CRUD_PG/@types/user.type";
import UserService from "@CRUD_PG/services/user-service";
import { StatusCode } from "@CRUD_PG/utils/consts";
import { HttpException } from "@CRUD_PG/utils/http-exception";
import { SuccessResponse } from "@CRUD_PG/utils/response";
import { Request, Response, NextFunction } from "express";
class UserController {
  private userService: UserService;
  constructor() {
    this.userService = new UserService();
  }
  public async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userDetails: IUser = req.body;

      if (!userDetails.firstName || !userDetails.lastName) {
        throw new HttpException(
          "Missing or invalid user details ",
          StatusCode.NotFound
        );
      }

      const createdUser = await this.userService.createUser(userDetails);
      res
        .status(StatusCode.Created)
        .json(new SuccessResponse("201", "OK", createdUser));
    } catch (error) {
      next(error);
    }
  }

  public async getAllUsers(_req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.userService.getAllUsers();
      res
        .status(StatusCode.OK)
        .json(new SuccessResponse("OK", "Fetch User Successfull.", user));
    } catch (error) {
      next(error);
    }
  }
  public async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      console.log("ID: ", id);

      if (!id) {
        throw new HttpException("User is incorrect!", StatusCode.NotFound);
      }
      const deleteUser = await this.userService.deleteUser(id);
      res
        .status(StatusCode.NoContent)
        .json(new SuccessResponse("OK", "User Deleted", deleteUser));
    } catch (error) {
      next(error);
    }
  }
  public async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userDetails: IUser = req.body;
      const id = parseInt(req.params.id);
      if (!id) {
        throw new HttpException("User is incorrect!", StatusCode.NotFound);
      }
      const updateUser = await this.userService.updateUser(id, userDetails);
      res
        .status(StatusCode.OK)
        .json(new SuccessResponse("OK", "User Updated", updateUser));
    } catch (error) {
      next(error);
    }
  }
}
export default UserController;
