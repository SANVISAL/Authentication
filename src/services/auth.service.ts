import { RoleRepository } from "@CRUD_PG/database/repositories/role.repository";
import { SessionRepository } from "@CRUD_PG/database/repositories/session.repository";
import { UserRoleRepository } from "@CRUD_PG/database/repositories/user-role.repository";
import { UserRepository } from "@CRUD_PG/database/repositories/user.repository";
import { IAuthService } from "./@types/auth.service.type";
import { IJwt, ILoginUser } from "@CRUD_PG/@types/auth.type";
import { IUser } from "@CRUD_PG/@types/user.type";
import { HttpException } from "@CRUD_PG/utils/http-exception";
import { ApiError } from "@CRUD_PG/utils/api-error";
import { StatusCode } from "@CRUD_PG/utils/consts";
import { TokenService } from "@CRUD_PG/utils/jwt";

export class AuthService implements IAuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userRoleRepository: UserRoleRepository,
    private readonly roleRepository: RoleRepository,
    private readonly sessionRepository: SessionRepository,
    private readonly _tokenService: TokenService
  ) {}
  logout(token: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public async register(user: IUser): Promise<IJwt> {
    try {
      if (!user) {
        throw new HttpException("Created Failse", StatusCode.BadRequest);
      }
      const createUser = await this.userRepository.create(user);
      const accessToken = this._tokenService.issueToken(createUser);
      const refreshToken = this._tokenService.rotateRefreshToken(createUser);
      // const expireAt = this._tokenService.getTokenExpiration(refreshToken);
      const tokekn ={}

      await this.sessionRepository.create({,""});
      // console.log(token);
      const jwt = {
        accessToken,
        refreshToken,
        expireAt: this._tokenService.getTokenExpiration(accessToken),
      };
      return jwt;
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
      const existedUser = await this.userRepository.findByEmail(user.email);
      if (!existedUser || existedUser.password !== user.password) {
        throw new HttpException("Invalid credentials", StatusCode.Unauthorized);
      }
      const accessToken = this._tokenService.issueToken(existedUser);
      const refreshToken = this._tokenService.rotateRefreshToken(existedUser);
      // const expireAt = this._tokenService.getTokenExpiration(refreshToken);
      // await this.sessionRepository.create({ refreshToken, expireAt });
      // console.log(token);
      const jwt = {
        accessToken,
        refreshToken,
        expireAt: this._tokenService.getTokenExpiration(accessToken),
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
  // }
}
