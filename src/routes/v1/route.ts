import { Router } from "express";
import { ROUTE_PATH } from "../route-refer";
import UserController from "@CRUD_PG/controllers/user-controller";

const route = Router();
const userController = new UserController();

route.post(ROUTE_PATH.USERS, userController.createUser.bind(userController));
route.get(ROUTE_PATH.All_USER, userController.getAllUsers.bind(userController));
route.delete(
  ROUTE_PATH.DELETE_USER,
  userController.deleteUser.bind(userController)
);
route.put(
  ROUTE_PATH.DELETE_USER,
  userController.updateUser.bind(userController)
);

export default route;
