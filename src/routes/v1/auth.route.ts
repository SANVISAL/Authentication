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
      const users = await controller.register(user);
      res.json(users);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
