import { Router, Request, Response, NextFunction } from "express";
import { routePath } from "..";
import { AppContainer } from "@AUTH/di/app-container";

const router: Router = Router();

const controller = AppContainer.getAuthController();

router.post(
  routePath.REGISTER,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.body;
      // const role = req.body.role;
      //  const role = req.params.role; // Extract role from URL parameters
      const users = await controller.register(user);
      res.json(users);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  routePath.LOGIN,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.body;

      const response = await (await controller).login(user);

      res.json(response);
    } catch (error: unknown) {
      next(error);
    }
  }
);

export default router;
