import UserController from "@project_name/controllers/user-controller";
import Router, { NextFunction, Request, Response } from "express";
import { ROUTE_PATH } from "../routes-refer";
import UserService from "@project_name/services/user-service";
import UserRespository from "@project_name/database/repositories/user-repository";
import User from "@project_name/database/models/model-user";
import AppDataSource from "@project_name/database";

const route = Router();
// Dependency injection of the repository into the service
const  userRepository= new UserRespository(AppDataSource.getRepository(User))
const  userservice= new UserService(userRepository)

// Dependency injection of the service into the controller
const  usercontroller = new UserController(userservice);

route.post(
  ROUTE_PATH.USERS,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("Hello Route");
      const user = req.body;
      const users = await usercontroller.userCreate(user);
      res.json(users);
    } catch (error) {
      next(error);
    }
  }
);

route.get(
  ROUTE_PATH.All_USER,
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await usercontroller.getAllUser();
      res.json(users);
    } catch (error) {
      next(error);
    }
  }
);

export default route;
