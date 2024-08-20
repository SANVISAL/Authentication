// import { FindOptionsWhere, Repository } from "typeorm";
// import { User } from "../entities/user.entity";
// import { AppDataSource } from "../data-source";
// import { HttpException } from "@CRUD_PG/utils/http-exception";
// import { StatusCode } from "@CRUD_PG/utils/consts";
// import { IRepository, QueryParams } from "../@types/user-repository.type";
// import { IUser, IUserResponse } from "@CRUD_PG/@types/user.type";
// import { ApiError } from "@CRUD_PG/utils/api-error";
// import { logger } from "@CRUD_PG/utils/logger";
// import { validate } from "class-validator";

// export class UserRepository implements IRepository {
//   private _repository: Repository<User>;
//   private readonly _appDataSource: AppDataSource;
//   public constructor() {
//     this._appDataSource = AppDataSource.getInstance();
//     this._repository = this._appDataSource.getRepository(User);
//   }

//   public async findOne(id: string): Promise<IUserResponse | null> {
//     try {
//       const user = await this._repository.findOne({
//         where: [
//           {
//             id,
//           },
//         ],
//       });

//       if (!user) {
//         throw new HttpException("No user found.", StatusCode.NotFound);
//       }
//       return user;
//     } catch (error: unknown) {
//       logger.error(`An error occurred while find user ${error}`);
//       if (error instanceof HttpException) {
//         throw error;
//       }
//       throw new ApiError();
//     }
//   }
//   public async create(user: IUser): Promise<IUserResponse> {
//     try {
//       const createdUser = this._repository.create(user);

//       const errors = await validate(user);

//       if (errors.length > 0) {
//         console.log(errors);
//         throw new HttpException(
//           "Failed to create user.",
//           StatusCode.BadRequest
//         );
//       }

//       const savedUser = await this._repository.save(createdUser);
//       if (!savedUser) {
//         throw new HttpException(
//           "Could not create user.",
//           StatusCode.BadRequest
//         );
//       }
//       return savedUser;
//     } catch (error: unknown) {
//       logger.error(`An error occurred while creating user${error}`);
//       if (error instanceof HttpException) {
//         throw error;
//       }
//       throw new ApiError();
//     }
//   }
//   public async findAll(): Promise<IUserResponse[]> {
//     try {
//       const users = await this._repository.find();
//       if (users.length === 0) {
//         throw new HttpException("No users found", StatusCode.NotFound);
//       }

//       return users;
//     } catch (error) {
//       logger.error(`An error occurred while find all users ${error}`);
//       if (error instanceof HttpException) {
//         throw error;
//       }
//       throw new ApiError();
//     }
//   }
//   public async delete(id: string): Promise<void> {
//     try {
//       const deletedUser = await this._repository.delete(id);
//       if (deletedUser.affected === 0) {
//         throw new HttpException("No user found", StatusCode.NotFound);
//       }
//     } catch (error) {
//       logger.error(`An error occurred while deleting ${error}`);

//       if (error instanceof HttpException) {
//         throw error;
//       }
//       throw new ApiError();
//     }
//   }

//   public async update(
//     id: string,
//     updateUser: Partial<IUser>
//   ): Promise<IUserResponse> {
//     try {
//       const updatedUser = await this._repository.update(id, updateUser);
//       if (updatedUser.affected === 0) {
//         throw new HttpException("Could not update user.", StatusCode.NotFound);
//       }

//       const user = await this.findOne(id);

//       return user as IUserResponse;
//     } catch (error) {
//       logger.error(`An error occurred while updating user ${error}`);

//       if (error instanceof HttpException) {
//         throw error;
//       }
//       throw new ApiError();
//     }
//   }

//   public async findByParams(
//     param: FindOptionsWhere<QueryParams>
//   ): Promise<IUserResponse[]> {
//     try {
//       const users = await this._repository.find({ where: param });

//       return users;
//     } catch (error: unknown) {
//       logger.error(`An error occurred while find user by params  ${error}`);
//       if (error instanceof HttpException) {
//         throw error;
//       }
//       throw new ApiError();
//     }
//   }
// }
