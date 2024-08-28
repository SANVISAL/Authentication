import { AppContainer } from "@AUTH/di/app-container";
import { authorize, RequestWithUser } from "@AUTH/middlewares/authorize";
import { NextFunction, Response, Router, Request } from "express";
import { routePath } from "..";
import router from "./auth.route";
import { logger } from "@AUTH/utils/logger";

const user: Router = Router();
const UserController = AppContainer.getUserController();

user.get(
  routePath.PROFILE,
  authorize(["user", "admin"]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as RequestWithUser).user.userid;
      const user = await UserController.getProfile(userId);
      res.json(user);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

user.put(
  routePath.UPDATE,
  authorize(["user", "admin"]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as RequestWithUser).user.userid;
      const updatedUser = req.body;
      const updateUser = await UserController.updateProfile(
        userId,
        updatedUser
      );
      res.json(updateUser);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);
router.delete(
  routePath.DELETEPROFILE,
  authorize(["user", "admin"]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as RequestWithUser).user.userid;
      const response = await UserController.deleteProfile(userId);
      res.json(response);
    } catch (error) {
      logger.error(error);
      next(error);
    }
  }
);
export default user;
