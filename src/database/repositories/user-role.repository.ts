import { StatusCode } from "@AUTH/utils/consts";
import { HttpException } from "@AUTH/utils/http-exception";
import { logger } from "@AUTH/utils/logger";
import { UserRole } from "../entities/user-role.entity";
import { Repository } from "typeorm";
import { validateOrReject, ValidationError } from "class-validator";
import { formatValidationErrors } from "@AUTH/utils/validation";

export class UserRoleRepository {
  constructor(private repository: Repository<UserRole>) {}

  public async findOne(
    userId: string,
    roleId: string
  ): Promise<UserRole | null> {
    try {
      return await this.repository.findOne({
        where: { userId, roleId },
      });
    } catch (error: unknown) {
      logger.error(
        `Failed to find user role. UserId: ${userId}, RoleId: ${roleId}. Error: ${error}`
      );
      throw error;
    }
  }

  public async findAll(): Promise<UserRole[]> {
    try {
      return await this.repository.find();
    } catch (error: unknown) {
      logger.error(`Failed to retrieve all user roles. Error: ${error}`);
      throw error;
    }
  }

  public async findRolesForUser(userId: string): Promise<UserRole[]> {
    try {
      return await this.repository.find({
        where: { userId },
        relations: ["role"],
      });
    } catch (error: unknown) {
      logger.error(
        `Failed to find roles for user. UserId: ${userId}. Error: ${error}`
      );
      throw error;
    }
  }

  public async findUsersForRole(roleId: string): Promise<UserRole[]> {
    try {
      return await this.repository.find({
        where: { roleId },
        relations: ["user"],
      });
    } catch (error: unknown) {
      logger.error(
        `Failed to find users for role. RoleId: ${roleId}. Error: ${error}`
      );
      throw error;
    }
  }

  public async addRoleToUser(
    userId: string,
    roleId: string
  ): Promise<UserRole> {
    try {
      const existingUserRole = await this.findOne(userId, roleId);

      if (existingUserRole) {
        throw new HttpException(
          "Role already assigned to the user.",
          StatusCode.Conflict
        );
      }

      const newUserRole = this.repository.create({ userId, roleId });

      await validateOrReject(newUserRole);

      return await this.repository.save(newUserRole);
    } catch (error: unknown) {
      logger.error(
        `Failed to add role to user. UserId: ${userId}, RoleId: ${roleId}. Error: ${error}`
      );
      if (Array.isArray(error)) {
        const errorMessages = formatValidationErrors(
          error as ValidationError[]
        );

        throw new HttpException(
          `${errorMessages}`,
          StatusCode.UnprocessableEntity
        );
      } else {
        throw error;
      }
    }
  }
}
