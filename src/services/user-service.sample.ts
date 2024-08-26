// import { IUser, IUserResponse } from "@CRUD_PG/@types/user.type";
// import { UserRepository } from "@CRUD_PG/database/repositories/user-repository.sample";
// import { ApiError } from "@CRUD_PG/utils/api-error";
// import { HttpException } from "@CRUD_PG/utils/http-exception";
// import { IUserService } from "./@types/user-service.type";
// import { SuccessResponse } from "@CRUD_PG/utils/response";
// import { GenericResponse } from "@CRUD_PG/controllers/@types/controller.type";
// import { StatusCode } from "@CRUD_PG/utils/consts";

// export class UserService implements IUserService {
//   private _userRepository: UserRepository;
//   constructor() {
//     this._userRepository = new UserRepository();
//   }

//   public async getUser(id: string): Promise<SuccessResponse<GenericResponse>> {
//     try {
//       const user = await this._userRepository.findOne(id);

//       return new SuccessResponse("200", "OK", {
//         data: user as IUserResponse,
//       });
//     } catch (error: unknown) {
//       if (error instanceof HttpException) {
//         throw error;
//       }
//       throw new ApiError();
//     }
//   }

//   public async createUser(
//     user: IUser
//   ): Promise<SuccessResponse<GenericResponse>> {
//     try {
//       const existingUser = await this._userRepository.findByParams({
//         email: user.email,
//       });

//       if (existingUser.length > 0) {
//         throw new HttpException("user already exist.", StatusCode.Conflict);
//       }

//       const createdUser = await this._userRepository.create(user);
//       return new SuccessResponse("200", "OK", {
//         data: createdUser as IUserResponse,
//       });
//     } catch (error) {
//       if (error instanceof HttpException) {
//         throw error;
//       }
//       throw new ApiError();
//     }
//   }

//   public async getAllUsers(): Promise<
//     SuccessResponse<{ data: IUserResponse[] }>
//   > {
//     try {
//       const users = await this._userRepository.findAll();
//       return new SuccessResponse("200", "OK", {
//         data: users as IUserResponse[],
//       });
//     } catch (error) {
//       if (error instanceof HttpException) {
//         throw error;
//       }
//       throw new ApiError();
//     }
//   }
//   public async deleteUser(id: string): Promise<SuccessResponse<null>> {
//     try {
//       // check if user exist
//       await this._userRepository.findOne(id);

//       await this._userRepository.delete(id);

//       return new SuccessResponse("200", "OK", null);
//     } catch (error) {
//       if (error instanceof HttpException) {
//         throw error;
//       }
//       throw new ApiError();
//     }
//   }
//   public async updateUser(
//     id: string,
//     user: Partial<IUser>
//   ): Promise<SuccessResponse<GenericResponse>> {
//     try {
//       // check if user exist
//       const existUser = await this._userRepository.findOne(id);

//       const updateFields: Partial<IUser> = {};

//       if (user?.firstName) {
//         if (user?.firstName === existUser?.firstName) {
//           throw new HttpException(
//             "this firstname you're already used.",
//             StatusCode.Conflict
//           );
//         }
//         updateFields.firstName = user.firstName;
//       }

//       if (user?.lastName) {
//         if (user?.lastName === existUser?.lastName) {
//           throw new HttpException(
//             "this lastName you're already used.",
//             StatusCode.Conflict
//           );
//         }
//         updateFields.lastName = user.lastName;
//       }
//       if (user?.email) {
//         if (user?.email === existUser?.email) {
//           throw new HttpException(
//             "this email you're already used.",
//             StatusCode.Conflict
//           );
//         }
//         const existingEmail = await this._userRepository.findByParams({
//           email: user.email,
//         });

//         if (existingEmail.length > 0) {
//           throw new HttpException(
//             "this email already used.",
//             StatusCode.Conflict
//           );
//         }
//         updateFields.email = user.email;
//       }

//       if (user?.address) {
//         if (user?.address === existUser?.address) {
//           throw new HttpException(
//             "this address you're already used.",
//             StatusCode.Conflict
//           );
//         }
//         updateFields.address = user.address;
//       }

//       if (user?.gender) {
//         if (user?.gender === existUser?.gender) {
//           throw new HttpException(
//             "this gender you're already used.",
//             StatusCode.Conflict
//           );
//         }
//         updateFields.gender = user.gender;
//       }

//       const updatedUser = await this._userRepository.update(id, updateFields);

//       return new SuccessResponse("200", "OK", {
//         data: updatedUser as IUserResponse,
//       });
//     } catch (error) {
//       if (error instanceof HttpException) {
//         throw error;
//       }
//       throw new ApiError();
//     }
//   }
// }
