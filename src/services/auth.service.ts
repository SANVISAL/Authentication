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
import { Roles, SessionStatus } from "@AUTH/utils/consts/enum-column";
import { stringToEnum } from "@AUTH/utils/string-to-enum";
import { IUser } from "@AUTH/@types/user.type";

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
      // Convert roles from strings to enums and retrieve corresponding roles from the database
      const roles = await Promise.all(
        user.role.map(async (role) => {
          const enumRole = stringToEnum(Roles, role);
          const foundRole = await this.roleRepository.findByName(
            enumRole as Roles
          );

          if (!foundRole) {
            throw new HttpException(
              `Invalid role: ${role}`,
              StatusCode.BadRequest
            );
          }
          return foundRole;
        })
      );

      // Ensure all roles were found; if not, throw a BadRequest exception
      if (!roles.length) {
        throw new HttpException(
          "Invalid roles provided.",
          StatusCode.BadRequest
        );
      }

      // Check if a user with the provided email already exists
      const existingUser = await this.userRepository.findByEmail(user.email);
      if (existingUser) {
        throw new HttpException(
          "An account with this email already exists.",
          StatusCode.Conflict
        );
      }

      // Initialize TokenService for handling password hashing and token generation
      const tokenService = new TokenService();
      // Hash the user's password before saving it to the database
      const hashPassword = await tokenService.hashPassword(user.password);

      // Create a new user in the database with the provided details and hashed password
      const newUser = await this.userRepository.create({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        gender: user.gender,
        password: hashPassword,
      });

      // Associate the newly created user with the specified roles in the user-role table
      await Promise.all(
        roles.map((role) =>
          this.userRoleRepository.addRoleToUser(newUser.id, role.id)
        )
      );

      // Generate an access token for the new user with their roles
      const accessToken = tokenService.issueToken(
        newUser,
        roles.map((role) => role.name)
      );
      // Generate a refresh token for the new user
      const refreshToken = tokenService.rotateRefreshToken(newUser);
      // Get the expiration time for the access token
      const expireAt = tokenService.getTokenExpiration(accessToken);

      // Create a new session for the user with the generated tokens and set it to active
      const session: ISession = {
        userId: newUser.id,
        accessToken,
        refreshToken,
        expireAt,
        lastAccess: new Date(),
        status: SessionStatus.active,
      };
      // Save the session in the database
      await this.sessionRepository.create(session);

      return { accessToken, refreshToken, expireAt };
    } catch (error: unknown) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new ApiError("Registration failed.");
    }
  }

  public async login(user: ILoginUser): Promise<IJwt> {
    try {
      const existingUser = await this.userRepository.findByEmail(user.email);
      if (!existingUser) {
        throw new HttpException(
          "No account found with this email.",
          StatusCode.Unauthorized
        );
      }

      const userRoles = await this.userRoleRepository.findRolesForUser(
        existingUser.id
      );
      const roles = await Promise.all(
        userRoles.map((userRole) =>
          this.roleRepository.findById(userRole.roleId)
        )
      );

      const tokenService = new TokenService();

      const isPasswordValid = await tokenService.comparePassword(
        user.password,
        existingUser.password
      );
      if (!isPasswordValid) {
        throw new HttpException(
          "Invalid username or password.",
          StatusCode.Unauthorized
        );
      }

      const accessToken = tokenService.issueToken(
        existingUser,
        roles.map((role) => role?.name as string)
      );
      const refreshToken = tokenService.rotateRefreshToken(existingUser);
      const expireAt = tokenService.getTokenExpiration(accessToken);

      const session: ISession = {
        userId: existingUser.id,
        accessToken,
        refreshToken,
        expireAt,
        lastAccess: new Date(),
        status: SessionStatus.active,
      };
      await this.sessionRepository.create(session);

      return { accessToken, refreshToken, expireAt };
    } catch (error: unknown) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new ApiError("Login failed.");
    }
  }

  public async getAllUsers() {
    try {
      const users = await this.userRepository.findAll();
      if (!users || users.length == -0) {
        throw new HttpException("No users found.", StatusCode.NotFound);
      }
      return users;
    } catch (error) {
      throw new ApiError("Failed to get all users.");
    }
  }
  public async getUserById(userId: string) {
    try {
      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw new HttpException("User not found.", StatusCode.NotFound);
      }
      return user;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new ApiError("Failed to get user by id.");
    }
  }
  public async deleteUser(userId: string) {
    try {
      return this.userRepository.softDelete(userId);
    } catch (error) {
      throw new ApiError("Failed to delete user.");
    }
  }
  public async updateUser(userId: string, updatedUser: IUser) {
    try {
      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw new HttpException("User not found.", StatusCode.NotFound);
      }
      const updateUser = await this.userRepository.updateById(
        userId,
        updatedUser
      );
      if (!updateUser) {
        throw new HttpException(
          "Failed to update user.",
          StatusCode.BadRequest
        );
      }
      return user;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new ApiError("Failed to update user.");
    }
  }
}
