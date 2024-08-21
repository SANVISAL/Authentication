import { Repository } from "typeorm";
import { Service } from "typedi";
import { logger } from "@CRUD_PG/utils/logger";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Validate } from "class-validator";
import { Role } from "../entities/role..entity";
import { IRole } from "@CRUD_PG/@types/role.type";
import { UpdatedResult } from "@CRUD_PG/@types/common.type";

@Service()
export class RoleRepository {
  // @InjectManager()
  // private _entityManager!: EntityManager;
  constructor(@InjectRepository(Role) private repository: Repository<Role>) {}

  public async findById(id: string): Promise<Role | null> {
    try {
      const role = await this.repository.findOne({
        where: { id },
      });

      return role;
    } catch (error: unknown) {
      logger.error(
        `An error occurred while finding role by id in repository. ${error}`
      );
      throw error;
    }
  }

  public async create(role: Partial<IRole>): Promise<Role> {
    try {
      Validate(Role);
      const newRole = this.repository.create({
        name: role.name,
        description: role.description,
      });

      return newRole;
    } catch (error: unknown) {
      logger.error(
        `An error occurred while creating role in repository. ${error}`
      );
      throw error;
    }
  }

  public async findAll(): Promise<Role[]> {
    try {
      const roles = await this.repository.find();

      return roles;
    } catch (error: unknown) {
      logger.error(
        `An error occurred while finding all roles in repository. ${error}`
      );
      throw error;
    }
  }

  public async updateById(
    id: string,
    partialRole: Partial<IRole>
  ): Promise<UpdatedResult> {
    try {
      const updatedRole = await this.repository.update(id, partialRole);

      const updateResult: UpdatedResult = {
        affected: updatedRole.affected,
        generatedMaps: updatedRole.generatedMaps,
        raw: updatedRole.generatedMaps,
      };

      return updateResult;
    } catch (error: unknown) {
      logger.error(
        `An error occurred while updating user in repository. ${error}`
      );

      throw error;
    }
  }
}
