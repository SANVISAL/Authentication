import { UpdatedResult } from "@AUTH/@types/common.type";
import { IUser } from "@AUTH/@types/user.type";
import { StatusCode } from "@AUTH/utils/consts";
import { HttpException } from "@AUTH/utils/http-exception";
import { logger } from "@AUTH/utils/logger";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";

export class UserRepository {
  constructor(private repository: Repository<User>) {}

  public async create(user: IUser): Promise<User> {
    try {
      const newUser = this.repository.create(user);
      return await this.repository.save(newUser);
    } catch (error: unknown) {
      logger.error(`Failed to create user. Error: ${error}`);
      throw error;
    }
  }

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

<<<<<<< HEAD
=======
  public async findByEmail(email: string): Promise<User | null> {
    try {
      const user = await this.repository.findOne({
        where: { email, isDeleted: false },
      });

      return user;
    } catch (error: unknown) {
      logger.error(`Failed to find user by email. Error: ${error}`);
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

>>>>>>> 172048ec996a71ecd671be97cff95668b1dd1587
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
      const existingUser = await this.findById(id);

      if (!existingUser) {
        throw new HttpException("User not found.", StatusCode.NotFound);
      }

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
