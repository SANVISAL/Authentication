import { Repository } from "typeorm";
import { Service } from "typedi";
import { logger } from "@CRUD_PG/utils/logger";
import { IUser } from "@CRUD_PG/@types/user.type";
import { InjectRepository } from "typeorm-typedi-extensions";
import { HttpException } from "@CRUD_PG/utils/http-exception";
import { StatusCode } from "@CRUD_PG/utils/consts";
import { Validate } from "class-validator";
import { User } from "../entities/user.entity";
import { UpdatedResult } from "@CRUD_PG/@types/common.type";

@Service()
export class UserRepository {
  // @InjectManager()
  // private _entityManager!: EntityManager;
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  public async findById(id: string): Promise<User | null> {
    try {
      const user = await this.repository.findOne({
        where: { id, isDeleted: false },
      });

      return user;
    } catch (error: unknown) {
      logger.error(
        `An error occurred while finding user by id in repository. ${error}`
      );
      throw error;
    }
  }

  public async create(user: Partial<IUser>): Promise<User> {
    try {
      Validate(User);
      const newUser = this.repository.create(user);
      const saveUser = await this.repository.save(newUser);
      return saveUser;
    } catch (error: unknown) {
      console.log("repo error: ", error);
      logger.error(
        `An error occurred while creating user in repository. ${error}`
      );
      throw error;
    }
  }

  public async findAll(): Promise<User[]> {
    try {
      const users = await this.repository.find({ where: { isDeleted: false } });

      return users;
    } catch (error: unknown) {
      logger.error(
        `An error occurred while finding all users in repository. ${error}`
      );
      throw error;
    }
  }

  public async updateById(
    id: string,
    partialUser: Partial<IUser>
  ): Promise<UpdatedResult> {
    try {
      const updatedUser = await this.repository.update(id, partialUser);

      const updateResult: UpdatedResult = {
        affected: updatedUser.affected,
        generatedMaps: updatedUser.generatedMaps,
        raw: updatedUser.raw,
      };

      return updateResult;
    } catch (error: unknown) {
      logger.error(
        `An error occurred while updating user in repository. ${error}`
      );

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

      const deletedResult: UpdatedResult = {
        affected: deletedUser.affected,
        generatedMaps: deletedUser.generatedMaps,
        raw: deletedUser.generatedMaps,
      };

      return deletedResult;
    } catch (error: unknown) {
      logger.error(
        `An error occurred while soft deleting user in repository. ${error}`
      );
      throw error;
    }
  }
}
