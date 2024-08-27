import { Repository } from "typeorm";
import { Role } from "../entities/role..entity";
import { IRole } from "@AUTH/@types/role.type";
import { logger } from "@AUTH/utils/logger";
import { Roles, StatusCode } from "@AUTH/utils/consts";
import { validateOrReject, ValidationError } from "class-validator";
import { formatValidationErrors } from "@AUTH/utils/validation";
import { HttpException } from "@AUTH/utils/http-exception";

export class RoleRepository {
  constructor(private repository: Repository<Role>) {}

  public async findById(id: string): Promise<Role | null> {
    try {
      return await this.repository.findOne({ where: { id } });
    } catch (error: unknown) {
      logger.error(`Failed to find role by id: ${id}. Error: ${error}`);
      throw error;
    }
  }

  public async findByName(name: Roles): Promise<Role | null> {
    try {
      const role = await this.repository.findOne({ where: { name } });

      return role;
    } catch (error: unknown) {
      logger.error(`Failed to find role by name. Error: ${error}`);
      throw error;
    }
  }

  public async create(role: Partial<IRole>): Promise<Role> {
    try {
      const newRole = this.repository.create(role);

      await validateOrReject(newRole);

      return await this.repository.save(newRole);
    } catch (error: unknown) {
      logger.error(`Failed to create role. Error: ${error}`);
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

  public async findAll(): Promise<Role[]> {
    try {
      return await this.repository.find();
    } catch (error: unknown) {
      logger.error(`Failed to retrieve all roles. Error: ${error}`);
      throw error;
    }
  }

  public async updateById(
    id: string,
    partialRole: Partial<IRole>
  ): Promise<Role | null> {
    try {
      // Step 1: Retrieve the entity from the database
      const existingRole = await this.repository.findOneOrFail({
        where: { id },
      });

      // Step 2: Merge the updates into the existing entity
      const updatedRole = this.repository.merge(existingRole, partialRole);

      // Step 3: Validate the merged entity
      await validateOrReject(updatedRole);

      // Step 4: Save the updated entity
      return await this.repository.save(updatedRole);
    } catch (error: unknown) {
      logger.error(`Failed to update role by id: ${id}. Error: ${error}`);
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
