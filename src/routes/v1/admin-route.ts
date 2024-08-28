// import { AppContainer } from "@AUTH/di/app-container";
// import { NextFunction, Router, Response, Request } from "express";
// import { routePath } from "..";
// // import { authorize } from "@AUTH/middlewares/authorize";

// const router: Router = Router();
// const adminController = AppContainer.getAdminController();

// router.get(
//   routePath.ALLUSER,
//   // expressAuthentication(["admin", "superAdmin"]),
//   async (_req: Request, res: Response, next: NextFunction) => {
//     try {
//       const users = await adminController.getAllUsers();
//       res.json(users);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

// router.get(
//   routePath.GETBYID,
//   // authorize(["admin", "superAdmin"]),
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const userId = req.params.id;
//       const user = await adminController.getUser(userId);
//       res.json(user);
//     } catch (error) {
//       next(error);
//     }
//   }
// );
// // router.put(
// //   routePath.GETBYID,
// //   authorize(["admin", "superAdmin"]),
// //   async (req: Request, res: Response, next: NextFunction) => {
// //     try {
// //       const userId = req.params.id;
// //       const user = await adminController.getById(userId);
// //       res.json(user);
// //     } catch (error) {
// //       next(error);
// //     }
// //   }
// // );
// router.delete(
//   routePath.DELETEBYID,
//   // authorize(["admin", "superAdmin"]),
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const userId = req.params.id;
//       const response = await adminController.deleteUser(userId);
//       res.json(response);
//     } catch (error) {
//       next(error);
//     }
//   }
// );
