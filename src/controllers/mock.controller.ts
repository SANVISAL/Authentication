// // import { ICreateUser } from "@CRUD_PG/@types/user.type";
// import { ICreateUser, LoginInfor } from "@CRUD_PG/@types/user.type";
// import { ROUTE_PATH } from "@CRUD_PG/routes";
// import { SessionService } from "@CRUD_PG/services/mock-service.ts/mock-session";
// import { UserService } from "@CRUD_PG/services/mock-service.ts/mock-user";
// import { ApiError } from "@CRUD_PG/utils/api-error";
// import { HttpException } from "@CRUD_PG/utils/http-exception";
// import { Body, Delete, Get, Path, Post, Route } from "tsoa";

// @Route("/api/v1")
// export class UserController {
//   private userService: UserService;
//   private sessionService: SessionService;

//   constructor() {
//     this.userService = new UserService();
//     this.sessionService = new SessionService();
//   }
//   @Post(ROUTE_PATH.CREATE_USER)
//   public async createUser(@Body() userDetails: ICreateUser) {
//     try {
//       console.log("Hello :");
//       const user = await this.userService.createUser(userDetails);
//       return user;
//     } catch (error) {
//       console.log("Error :", error);
//       if (error instanceof HttpException) {
//         throw error;
//       }
//       throw new ApiError();
//     }
//   }
//   @Get(ROUTE_PATH.GET_ALL_USERS)
//   public async getAllUsers() {
//     try {
//       console.log("fjfjfjf");
//       const response = await this.userService.getAllUsers();
//       return response;
//     } catch (error) {
//       console.log("Error :", error);
//       console.log("Herre: ++", error);
//       if (error instanceof HttpException) {
//         throw error;
//       }
//       throw new ApiError();
//     }
//   }
//   @Delete(ROUTE_PATH.DELETE_USER)
//   public async deleteUser(@Path() id: string) {
//     try {
//       const response = await this.userService.deleteUser(id);
//       return response;
//     } catch (error) {
//       console.log("Error :", error);
//       if (error instanceof HttpException) {
//         throw error;
//       }
//       throw new ApiError();
//     }
//   }
//   public async login(@Body() loginData: LoginInfor) {
//     try {
//       console.log("login");
//       const user = await this.sessionService.createSession(loginData);
//       return user;
//     } catch (error) {
//       console.log("Error :", error);
//       if (error instanceof HttpException) {
//         throw error;
//       }
//       throw new ApiError();
//     }
//   }
// }
