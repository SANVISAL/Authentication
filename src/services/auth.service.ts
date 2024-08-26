import { IJwt, ILoginUser, IRegisterUser } from "@AUTH/@types/auth.type";
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
import { SessionStatus } from "@AUTH/utils/consts/enum-column";
import { KeycloakService } from "./keycloak.service";

export class AuthService implements IAuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userRoleRepository: UserRoleRepository,
    private readonly roleRepository: RoleRepository,
    private readonly sessionRepository: SessionRepository
  ) {}
  logout(_token: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public async register(user: IRegisterUser): Promise<IJwt> {
    try {
      const existingRole = await this.roleRepository.findByName(user.role);

      if (!existingRole) {
        throw new HttpException(
          "Invalid role. can't find role name.",
          StatusCode.BadRequest
        );
      }
      // 1. find existing user
      const existingUser = await this.userRepository.findByEmail(user.email);

      if (existingUser) {
        throw new HttpException(
          "you're already have an account.",
          StatusCode.Conflict
        );
      } else {
        const tokenService = new TokenService();

        const hashPassword = await tokenService.hashPassword(user.password);
        // 2. create new user
        const newUser = await this.userRepository.create({
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          gender: user.gender,
          password: hashPassword,
        });

        //  Add user's id and role's ID to user role
        await this.userRoleRepository.addRoleToUser(
          newUser.id,
          existingRole.id
        );

        const accessToken = tokenService.issueToken(newUser, existingRole.name);
        const refreshToken = tokenService.rotateRefreshToken(newUser);
        const expireAt = tokenService.getTokenExpiration(accessToken);
        const session: ISession = {
          userId: newUser.id,
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
      }
    } catch (error: unknown) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new ApiError("Failed to register.");
    }
  }

  public async login(user: ILoginUser): Promise<IJwt> {
    try {
      const existedUser = await this.userRepository.findByEmail(user.email);
      if (!existedUser) {
        throw new HttpException(
          "You're not have an account.",
          StatusCode.Unauthorized
        );
      }

      const tokenService = new TokenService();

      const isPasswordValid = await tokenService.comparePassword(
        user.password,
        existedUser.password
      );

      if (!isPasswordValid) {
        throw new HttpException(
          "Your username or password is invalid.",
          StatusCode.Unauthorized
        );
      } else {
        // const userRoles = await this.userRoleRepository.findRolesForUser(
        //   existedUser.id
        // );

        const keycloakService = new KeycloakService();

        const token = await keycloakService.obtainAccessToken(user);

        const jwt = {
          accessToken: token.access_token,
          refreshToken: token.refresh_token,
          expireAt: token.expires_in,
        };

        return jwt;

        // const roleId: string = userRoles[0].roleId;
        // const role = await this.roleRepository.findById(roleId);
        // const accessToken = tokenService.issueToken(
        //   existedUser,
        //   role?.name as string
        // );
        // const refreshToken = tokenService.rotateRefreshToken(existedUser);
        // const expireAt = tokenService.getTokenExpiration(accessToken);
        // const session: ISession = {
        //   userId: existedUser.id,
        //   accessToken,
        //   refreshToken,
        //   expireAt,
        //   lastAccess: new Date(),
        //   status: SessionStatus.active,
        // };

        // await this.sessionRepository.create(session);
        // const jwt = {
        //   accessToken,
        //   refreshToken,
        //   expireAt,
        // };

        // return jwt;
      }
    } catch (error: unknown) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new ApiError("Failed to login.");
    }
  }
}
