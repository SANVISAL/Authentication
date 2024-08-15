import { Router } from "express";
import { ROUTE_PATH } from "..";
import { UserController } from "@CRUD_PG/controllers/user-controller";

const route = Router();
const userController = new UserController();

route.post(ROUTE_PATH.USERS, userController.createUser.bind(userController));
route.get(ROUTE_PATH.All_USER, userController.getAllUsers.bind(userController));

export default route;
