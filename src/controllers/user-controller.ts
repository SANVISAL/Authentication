// import { UserCreate } from "@CRUD_PG/database/repositories/@types/user-type-repo";
import { UserCreate } from "@CRUD_PG/database/repositories/@types/user-type-repo";
import UserService from "@CRUD_PG/services/user-service";
import { ErrorResponse, SuccessResponse } from "@CRUD_PG/utils/response";
import { Request, Response, NextFunction } from "express";
class UserController {
  private userService: UserService;
  constructor() {
    this.userService = new UserService();
  }
  public userCreate = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userDetails: UserCreate = req.body;

      if (!userDetails.firstName || !userDetails.lastName) {
        const errorResponse = new ErrorResponse(
          "VALIDATION_ERROR",
          "Name is required"
        );
        return res.status(400).json(errorResponse.serializeError());
      }

      const userCreate = await this.userService.createUser(userDetails);
      const response = new SuccessResponse(
        "USER_CREATED",
        "User created successfully",
        userCreate
      );
      res.status(201).json(response.serializeSuccess());
    } catch (error) {
      next(error);
    }
  };

  public getAllUsers = async (
    _req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = await this.userService.getAllUser();
      const response = new SuccessResponse(
        "USERS_FETCHED",
        "Users fetched successfully",
        user
      );
      res.status(201).json(response.serializeSuccess());
    } catch (error) {
      next(error);
    }
  };
}
export default UserController;
