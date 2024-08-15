import { Router } from "express";
import { ROUTE_PATH } from "../route-refer";
import UserController from "@CRUD_PG/controllers/user-controller";

const route = Router();
const userController = new UserController();

route.post(ROUTE_PATH.USERS, userController.userCreate);
route.get(ROUTE_PATH.All_USER, userController.getAllUsers);

export default route;
