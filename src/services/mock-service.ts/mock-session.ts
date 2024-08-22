// import { LoginInfor } from "@CRUD_PG/@types/user.type";
// import { HttpException } from "@CRUD_PG/utils/http-exception";
// import { SuccessResponse } from "@CRUD_PG/utils/response";

// // export class SessionService {
// //   constructor() {}
// //   // Method to create a new session

//   async createSession(login: LoginInfor) {
//     //login
//     try {
//       if (!login.token) {
//         throw new HttpException("Missing token", 400);
//       }
//       // Validate token
//       const data = {
//         email: login.email,
//         password: login.password,
//       };
//       return new SuccessResponse("", "login Successfully", data);
//     } catch (error) {
//       if (error instanceof HttpException) {
//         throw error;
//       }
//       throw new HttpException("Failed to create session", 500);
//     }
//   }
// }
