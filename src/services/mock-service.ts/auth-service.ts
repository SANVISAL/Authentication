// // import { ICreateUser } from "@CRUD_PG/@types/user.type";
// import { ICreateUser, LoginInfor } from "@CRUD_PG/@types/user.type";
// import { Gender, StatusCode } from "@CRUD_PG/utils/consts";
// import { HttpException } from "@CRUD_PG/utils/http-exception";
// import { TokenService } from "@CRUD_PG/utils/jwt";
// import { logger } from "@CRUD_PG/utils/logger";
// import { SuccessResponse } from "@CRUD_PG/utils/response";

// export interface IUser {
//   id: string;
//   firstName: string;
//   lastName: string;
//   gender: Gender;
//   email: string;
//   password: string;
// }

// const data: IUser[] = [
//   {
//     id: "23",
//     firstName: "he",
//     lastName: "visal",
//     gender: Gender.male, // Use the enum value
//     email: "sanvisal2302@gmail.com",
//     password: "sanvisal2302",
//   },
// ];

// export class AuthService {
//   private _tokenService: TokenService;
//   constructor() {
//     this._tokenService = new TokenService();
//   }
//   async createUser(userDetails: ICreateUser) {
//     try {
//       console.log("Hi");
//       logger.info(`SCM server has started with process id ${userDetails}`);
//       const user: IUser = {
//         id: "12",
//         firstName: userDetails.firstName,
//         lastName: userDetails.lastName,
//         gender: userDetails.gender,
//         email: userDetails.email,
//         password: userDetails.password,
//       };
//       if (!user) {
//         throw new HttpException("Created Failse", StatusCode.BadRequest);
//       }

//       const accessToken = this._tokenService.issueToken(user);
//       const refreshToken = this._tokenService.rotateRefreshToken(user);
//       const token = {
//         accessToken,
//         refreshToken,
//         user,
//       };
//       // console.log(token);
//       return new SuccessResponse("", "Created User", token);
//     } catch (error) {
//       if (error instanceof HttpException) {
//         throw error;
//       }
//       throw new HttpException(
//         "failed to create user",
//         StatusCode.InternalServerError
//       );
//     }
//   }
//   async getAllUsers() {
//     try {
//       const user = "Hello  World";
//       if (!user) {
//         throw new HttpException("No User Found", StatusCode.NotFound);
//       }
//       return new SuccessResponse("", "Get Users", user);
//     } catch (error) {
//       if (error instanceof HttpException) {
//         throw error;
//       }
//       throw new HttpException(
//         "failed to create user",
//         StatusCode.InternalServerError
//       );
//     }
//   }
//   async deleteUser(id: string) {
//     try {
//       if (!id) {
//         throw new HttpException("No id found.", StatusCode.BadRequest);
//       }
//       const user = "None";
//       if (!user) {
//         throw new HttpException("No User Found", StatusCode.NotFound);
//       }

//       return new SuccessResponse("", "User Deleted", user);
//     } catch (error) {
//       if (error instanceof HttpException) {
//         throw error;
//       }
//       throw new HttpException(
//         "failed to create user",
//         StatusCode.InternalServerError
//       );
//     }
//   }

//   async updateUser(id: string, updateDetails: IUser) {
//     try {
//       const existedUser = data.find((existedUser) => existedUser.id === id);
//       if (!existedUser) {
//         throw new HttpException("No id found.", StatusCode.BadRequest);
//       }
//       const updatedUser = {
//         ...data,
//         ...updateDetails,
//       };

//       return new SuccessResponse("", "User updated", updatedUser);
//     } catch (error: any) {
//       if (error instanceof HttpException) {
//         throw error;
//       }
//       throw new HttpException(
//         "failed to create user",
//         StatusCode.InternalServerError
//       );
//     }
//   }

//   async login(loginDetails: LoginInfor) {
//     try {
//       console.log("loginDetails:", loginDetails);
//       const user = data.find(
//         (user) =>
//           user.email === loginDetails.email &&
//           user.password === loginDetails.password
//       );
//       console.log("User", user);
//       if (!user) {
//         throw new HttpException(
//           "Invalid Email or Password!",
//           StatusCode.NotFound
//         );
//       }
//       const typedUser: IUser = user;
//       const accessToken = this._tokenService.issueToken(typedUser);
//       const refreshToken = this._tokenService.rotateRefreshToken(typedUser);
//       /// need to save refresh token to database

//       ///

//       const token = {
//         accessToken,
//         refreshToken,
//         typedUser,
//       };
//       return new SuccessResponse("", "Logged In Successfully", token);
//     } catch (error) {
//       if (error instanceof HttpException) {
//         throw error;
//       }
//       throw new HttpException(
//         "failed to create user",
//         StatusCode.InternalServerError
//       );
//     }
//   }
//   async logout() {
//     try {
//       // clear the token from the client's browser
//       return new SuccessResponse("", "Logged Out Successfully", null);
//     } catch (error) {
//       if (error instanceof HttpException) {
//         throw error;
//       }
//       throw new HttpException(
//         "failed to create user",
//         StatusCode.InternalServerError
//       );
//     }
//   }
// }
