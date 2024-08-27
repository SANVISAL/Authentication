import { Router, Request, Response, NextFunction } from "express";
import { routePath } from "..";
import { AppContainer } from "@AUTH/di/app-container";
import { authorize } from "@AUTH/middlewares/authorize";

const router: Router = Router();

const controller = AppContainer.getAuthController();

router.post(
  routePath.REGISTER,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.body;
      console.log("user:", user);
      // const role = req.body.role;
      //  const role = req.params.role; // Extract role from URL parameters
      const users = await  controller.register(user);
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

router.get(
  routePath.ALLUSER,
  authorize(["admin", "superAdmin"]),

  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await (await controller).getAllUsers();
      res.json(users);
    } catch (error) {
      next(error);
    }
  }
);


export default router;
