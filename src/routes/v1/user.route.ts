import { AppContainer } from "@AUTH/di/app-container";
import { authorize, RequestWithUser } from "@AUTH/middlewares/authorize";
import { NextFunction, Response, Router, Request } from "express";
import { routePath } from "..";

const user: Router = Router();
const UserController = AppContainer.getUserController();

user.get(
  routePath.PROFILE,
  authorize(["user", "admin"]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as RequestWithUser).user.userid;
      console.log("userId: ", userId);
      const user = await  UserController.getProfile(userId);
      res.json(user);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

user.put(
  routePath.UPDATE,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as RequestWithUser).user.userid;
      const updatedUser = req.body;
      const updateUser = await UserController.updateProfile(userId, updatedUser);
      res.json(updateUser);
    } catch (error) {
    console.log(error);
      next(error);
    }
  }
);
export default user;
