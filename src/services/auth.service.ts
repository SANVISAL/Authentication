import { IJwt, ILoginUser } from "@AUTH/@types/auth.type";
import { IUser } from "@AUTH/@types/user.type";
import { RoleRepository } from "@AUTH/database/repositories/role.repository";
import { SessionRepository } from "@AUTH/database/repositories/session.repository";
import { UserRoleRepository } from "@AUTH/database/repositories/user-role.repository";
import { UserRepository } from "@AUTH/database/repositories/user.repository";
import { IAuthService } from "./@types/auth.service.type";
import { TokenService } from "@AUTH/utils/jwt";
import { HttpException } from "@AUTH/utils/http-exception";
import { StatusCode } from "@AUTH/utils/consts";
import { ApiError } from "@AUTH/utils/api-error";
import { ISession } from "@AUTH/@types/session.type";
import { Roles, SessionStatus } from "@AUTH/utils/consts/enum-column";
import { stringToEnum } from "@AUTH/utils/string-to-enum";

export class AuthService implements IAuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userRoleRepository: UserRoleRepository,
    private readonly roleRepository: RoleRepository,
    private readonly sessionRepository: SessionRepository // private readonly _tokenService: TokenService
  ) {}
  logout(_token: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public async register(user: IUser): Promise<IJwt> {
    try {
      console.log("role Name:");

      if (!user) {
        throw new HttpException("Created Failse", StatusCode.BadRequest);
      }
      // FIND USER IN TABLE USER
      const existedUser = await this.userRepository.findByEmail(user.email);
      if (existedUser) {
        throw new HttpException(
          "this email already used.",
          StatusCode.Conflict
        );
      }
      const createUser = await this.userRepository.create(user);
      if (!createUser) {
        throw new HttpException("Invalid User", StatusCode.BadRequest);
      }
      //  GET DEFUALT ROLE
      const role = await this.roleRepository.findByName(Roles.user);
      console.log("role Name:",role?.name);
      if (!role) {
        throw new HttpException(
          "Default role not found",
          StatusCode.InternalServerError
        );
      }

      const tokenService = new TokenService();
      const accessToken = tokenService.issueToken(
        createUser
        // role?.name as string
      );
      const refreshToken = tokenService.rotateRefreshToken(createUser);
      const expireAt = tokenService.getTokenExpiration(accessToken);
      const session: ISession = {
        accessToken,
        refreshToken,
        expireAt,
        lastAccess: new Date(),
        status: SessionStatus.active,
      };

      await this.sessionRepository.create(session);
      // console.log(token);
      const jwt = {
        accessToken,
        refreshToken,
        expireAt,
      };

      return jwt;
      //
    } catch (error: unknown) {
      console.log("service:", error);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new ApiError("Failed to register.");
    }
  }

  public async login(user: ILoginUser): Promise<IJwt> {
    try {
      const existedUser = await this.userRepository.findByEmail(user.email); // TABLE  USER FIND USER ID
      if (!existedUser || existedUser.password !== user.password) {
        throw new HttpException("Invalid credentials", StatusCode.Unauthorized);
      }
      const userRole = await this.userRoleRepository.findRolesForUser(
        // TABLE USERROLE FOR FIND ROLE ID
        existedUser.id
      );
      if (!userRole) {
        throw new HttpException("Role not found", StatusCode.NotFound);
      }
      // const roleid: string = userRole[0].roleId;
      // const role = await this.roleRepository.findById(roleid); // TABLE ROLE FIND ROLE NAME
      // const roleName = await this.roleRepository.findById(roleid);
      const tokenService = new TokenService();
      const accessToken = tokenService.issueToken(existedUser);
      const refreshToken = tokenService.rotateRefreshToken(existedUser);
      const expireAt = tokenService.getTokenExpiration(accessToken);
      const session: ISession = {
        accessToken,
        refreshToken,
        expireAt,
        lastAccess: new Date(),
        status: SessionStatus.active,
      };

      await this.sessionRepository.create(session);
      const jwt = {
        accessToken,
        refreshToken,
        expireAt,
      };

      return jwt;
    } catch (error: unknown) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new ApiError("Failed to login.");
    }
  }

  // public logout(token: string): Promise<void> {
  //   try {
  //   } catch (error: unknown) {
  //     if (error instanceof HttpException) {
  //       throw error;
  //     }
  //     throw new ApiError("Failed to logout.");
  //   }
  // // }
  async getRoleNama(roleName: string) {
    try {
      const enumRole = stringToEnum(Roles, roleName);
      const role = await this.roleRepository.findByName(enumRole as Roles);
      return role?.name;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new ApiError("Failed to get role name.");
    }
  }
}
