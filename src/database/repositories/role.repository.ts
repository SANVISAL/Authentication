import { Repository } from "typeorm";
import { Role } from "../entities/role..entity";
import { UpdatedResult } from "@AUTH/@types/common.type";
import { IRole } from "@AUTH/@types/role.type";
import { logger } from "@AUTH/utils/logger";

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

  public async create(role: Partial<IRole>): Promise<Role> {
    try {
      const newRole = this.repository.create(role);
      return await this.repository.save(newRole);
    } catch (error: unknown) {
      logger.error(`Failed to create role. Error: ${error}`);
      throw error;
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
  ): Promise<UpdatedResult> {
    try {
      const updateResult = await this.repository.update(id, partialRole);
      return {
        affected: updateResult.affected,
        generatedMaps: updateResult.generatedMaps,
        raw: updateResult.raw,
      };
    } catch (error: unknown) {
      logger.error(`Failed to update role by id: ${id}. Error: ${error}`);
      throw error;
    }
  }
}
