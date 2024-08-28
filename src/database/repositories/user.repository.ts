import { UpdatedResult } from "@AUTH/@types/common.type";
import { IUser } from "@AUTH/@types/user.type";
import { StatusCode } from "@AUTH/utils/consts";
import { HttpException } from "@AUTH/utils/http-exception";
import { logger } from "@AUTH/utils/logger";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { validateOrReject, ValidationError } from "class-validator";
import { formatValidationErrors } from "@AUTH/utils/validation";

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

      await validateOrReject(newUser);

      return await this.repository.save(newUser);
    } catch (error: unknown) {
      logger.error(`Failed to create user. Error: ${error}`);

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

  public async findAll(): Promise<User[]> {
    try {
      return await this.repository.find({ where: { isDeleted: false } });
    } catch (error: unknown) {
      logger.error(`Failed to retrieve all users. Error: ${error}`);
      throw error;
    }
  }

  // changes
  public async updateById(
    id: string,
    partialUser: Partial<IUser>
  ): Promise<User | null> {
    try {
      // Step 1: Retrieve the entity from the database
      const existingUser = await this.repository.findOneOrFail({
        where: { id, isDeleted: false },
      });

      // Step 2: Merge the updates into the existing entity
      const updatedUser = this.repository.merge(existingUser, partialUser);

      // Step 3: Validate the merged entity
      await validateOrReject(updatedUser);

      // Step 4: Save the updated entity
      return await this.repository.save(updatedUser);
    } catch (error: unknown) {
      logger.error(`Failed to update user by id: ${id}. Error: ${error}`);
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

  public async findByEmail(email: string): Promise<User | null> {
    try {
      const user = await this.repository.findOne({
        where: { email, isDeleted: false },
      });
      return user;
    } catch (error) {
      logger.error(`Failed to find user by email: ${email}. Error: ${error}`);
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
