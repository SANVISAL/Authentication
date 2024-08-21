import { logger } from "@CRUD_PG/utils/logger";
import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { UserRole } from "../entities/user-role.entity";
import { Repository } from "typeorm";
import { HttpException } from "@CRUD_PG/utils/http-exception";
import { StatusCode } from "@CRUD_PG/utils/consts";

@Service()
export class UserRoleRepository {
  constructor(
    @InjectRepository(UserRole) private repository: Repository<UserRole>
  ) {}

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
      return await this.repository.save(newUserRole);
    } catch (error: unknown) {
      logger.error(
        `Failed to add role to user. UserId: ${userId}, RoleId: ${roleId}. Error: ${error}`
      );
      throw error;
    }
  }
}
