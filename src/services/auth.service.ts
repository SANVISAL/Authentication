import { IJwt, ILoginUser } from "@AUTH/@types/auth.type";
import { IUser } from "@AUTH/@types/user.type";
import { RoleRepository } from "@AUTH/database/repositories/role.repository";
import { SessionRepository } from "@AUTH/database/repositories/session.repository";
import { UserRoleRepository } from "@AUTH/database/repositories/user-role.repository";
import { UserRepository } from "@AUTH/database/repositories/user.repository";
import { ApiError } from "@AUTH/utils/api-error";
import { HttpException } from "@AUTH/utils/http-exception";
import { IAuthService } from "./@types/auth.service.type";

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
