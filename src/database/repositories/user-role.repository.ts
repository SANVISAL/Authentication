import { logger } from "@CRUD_PG/utils/logger";
import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { UserRole } from "../entities/user-role.entity";
import { Repository } from "typeorm";
import { HttpException } from "@CRUD_PG/utils/http-exception";
import { StatusCode } from "@CRUD_PG/utils/consts";

@Service()
export class UserRoleRepository {
  // @InjectManager()
  // private _entityManager!: EntityManager;
  constructor(
    @InjectRepository(UserRole) private repository: Repository<UserRole>
  ) {}

  public async findOne(
    userId: string,
    roleId: string
  ): Promise<UserRole | null> {
    try {
      const userRole = await this.repository.findOne({
        where: { userId: userId, roleId: roleId },
      });

      return userRole;
    } catch (error: unknown) {
      throw error;
    }
  }

  public async findAll(): Promise<UserRole[]> {
    try {
      const userRoles = await this.repository.find();

      return userRoles;
    } catch (error: unknown) {
      logger.error(
        `An error occurred while finding all user role in repository. ${error}`
      );
      throw error;
    }
  }

  public async findRolesForUser(userId: string): Promise<UserRole[] | null> {
    try {
      const usersRoles = await this.repository.find({
        where: { userId },
        relations: ["role"],
      });   

      return usersRoles;
    } catch (error: unknown) {
      logger.error(
        `An error occurred while finding roles for user by user id in repository. ${error}`
      );
      throw error;
    }
  }

  public async findUsersForRole(roleId: string): Promise<UserRole[] | null> {
    try {
      const roleUsers = await this.repository.find({
        where: {
          roleId,
        },
        relations: ["user"],
      });

      return roleUsers;
    } catch (error: unknown) {
      logger.error(
        `An error occurred while finding users for role by role id in repository. ${error}`
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

      return newUserRole;
    } catch (error: unknown) {
      logger.error(
        `An error occurred while adding role to user by role id and user id in repository. ${error}`
      );
      throw error;
    }
  }
}
