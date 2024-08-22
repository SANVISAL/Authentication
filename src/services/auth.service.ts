import { RoleRepository } from "@CRUD_PG/database/repositories/role.repository";
import { SessionRepository } from "@CRUD_PG/database/repositories/session.repository";
import { UserRoleRepository } from "@CRUD_PG/database/repositories/user-role.repository";
import { UserRepository } from "@CRUD_PG/database/repositories/user.repository";
import { IAuthService } from "./@types/auth.service.type";
import { IJwt, ILoginUser } from "@CRUD_PG/@types/auth.type";
import { IUser } from "@CRUD_PG/@types/user.type";
import { HttpException } from "@CRUD_PG/utils/http-exception";
import { ApiError } from "@CRUD_PG/utils/api-error";

export class AuthService implements IAuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userRoleRepository: UserRoleRepository,
    private readonly roleRepository: RoleRepository,
    private readonly sessionRepository: SessionRepository
  ) {}

  public async register(user: IUser): Promise<IJwt> {
    try {
      //
    } catch (error: unknown) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new ApiError("Failed to register.");
    }
  }

  public async login(user: ILoginUser): Promise<IJwt> {
    try {
    } catch (error: unknown) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new ApiError("Failed to login.");
    }
  }

  public logout(token: string): Promise<void> {
    try {
    } catch (error: unknown) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new ApiError("Failed to logout.");
    }
  }
}
