import { Service } from "typedi";
import { HttpException } from "@CRUD_PG/utils/http-exception";
import { StatusCode, Gender, Roles } from "@CRUD_PG/utils/consts";
import { UserRepository } from "@CRUD_PG/database/repositories/user.repository";
import { UserRoleRepository } from "@CRUD_PG/database/repositories/user-role.repository";
import { RoleRepository } from "@CRUD_PG/database/repositories/role.repository";
import { SessionRepository } from "@CRUD_PG/database/repositories/session.repository";

@Service()
export class HealthService {
  constructor(
    private userRepository: UserRepository,
    private userRoleRepository: UserRoleRepository,
    private roleRepository: RoleRepository,
    private sessionRepository: SessionRepository
  ) {}

  public async checkHealthUser(): Promise<boolean> {
    try {
      const newUser = await this.userRepository.create({
        email: "vatgaming287@gmail.com",
        firstName: "song",
        lastName: "vath",
        gender: Gender.male,
        password: "geigy4hurehgeg7eugu",
      });

      if (!newUser) {
        throw new HttpException(
          "Could not create user.",
          StatusCode.InternalServerError
        );
      }

      return true;
    } catch (error: unknown) {
      throw error;
    }
  }

  public async checkHealthUserRole(): Promise<boolean> {
    try {
      const userRoles = await this.userRoleRepository.findAll();
      if (userRoles.length < 1) {
        throw new HttpException(
          "No user roles found.",
          StatusCode.InternalServerError
        );
      }

      return true;
    } catch (error: unknown) {
      throw error;
    }
  }

  public async checkHealthRole(): Promise<boolean> {
    try {
      const roles = await this.roleRepository.findAll();
      if (roles.length < 1) {
        throw new HttpException(
          "No roles found.",
          StatusCode.InternalServerError
        );
      }

      const newRole = await this.roleRepository.create({
        name: Roles.admin,
      });

      if (!newRole) {
        throw new HttpException(
          "Could not create role.",
          StatusCode.InternalServerError
        );
      }

      return true;
    } catch (error: unknown) {
      throw error;
    }
  }

  public async checkHealthSession(): Promise<boolean> {
    try {
      const sessions = await this.sessionRepository.findAll();
      if (sessions.length < 1) {
        throw new HttpException(
          "No sessions found.",
          StatusCode.InternalServerError
        );
      }

      const newSession = await this.sessionRepository.create({
        token: "sample_token",
        expireAt: new Date(),
      });

      if (!newSession) {
        throw new HttpException(
          "Could not create session.",
          StatusCode.InternalServerError
        );
      }

      return true;
    } catch (error: unknown) {
      throw error;
    }
  }
}
