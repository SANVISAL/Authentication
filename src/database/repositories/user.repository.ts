import { Repository } from "typeorm";
import { logger } from "@CRUD_PG/utils/logger";
import { IUser } from "@CRUD_PG/@types/user.type";
import { HttpException } from "@CRUD_PG/utils/http-exception";
import { StatusCode } from "@CRUD_PG/utils/consts";
import { User } from "../entities/user.entity";
import { UpdatedResult } from "@CRUD_PG/@types/common.type";

export class UserRepository {
  constructor(private repository: Repository<User>) {}

  public async findById(id: string): Promise<User | null> {
    try {
      const user = await this.repository.findOne({
        where: { id, isDeleted: false },
      });
      return user;
    } catch (error: unknown) {
      logger.error(`Failed to find user by id: ${id}. Error: ${error}`);
      throw error;
    }
  }

  public async create(user: IUser): Promise<User> {
    try {
      const newUser = this.repository.create(user);
      return await this.repository.save(newUser);
    } catch (error: unknown) {
      logger.error(`Failed to create user. Error: ${error}`);
      throw error;
    }
  }

  public async findAll(): Promise<User[]> {
    try {
      return await this.repository.find({ where: { isDeleted: false } });
    } catch (error: unknown) {
      logger.error(`Failed to retrieve all users. Error: ${error}`);
      throw error;
    }
  }

  public async updateById(
    id: string,
    partialUser: Partial<IUser>
  ): Promise<UpdatedResult> {
    try {
      const updateResult = await this.repository.update(id, partialUser);

      return {
        affected: updateResult.affected,
        generatedMaps: updateResult.generatedMaps,
        raw: updateResult.raw,
      };
    } catch (error: unknown) {
      logger.error(`Failed to update user by id: ${id}. Error: ${error}`);
      throw error;
    }
  }

  public async softDelete(id: string): Promise<UpdatedResult> {
    try {
      const existingUser = await this.findById(id);

      if (!existingUser) {
        throw new HttpException("User not found.", StatusCode.NotFound);
      }

      const deletedUser = await this.repository.update(id, {
        isDeleted: true,
      });

      return {
        affected: deletedUser.affected,
        generatedMaps: deletedUser.generatedMaps,
        raw: deletedUser.raw,
      };
    } catch (error: unknown) {
      logger.error(`Failed to soft delete user by id: ${id}. Error: ${error}`);
      throw error;
    }
  }
}
