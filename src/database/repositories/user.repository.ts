import { EntityManager, Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { Service } from "typedi";
import { logger } from "@CRUD_PG/utils/logger";
import { IUser, IUserResponse } from "@CRUD_PG/@types/user.type";
import { InjectManager, InjectRepository } from "typeorm-typedi-extensions";

@Service()
export class UserRepository {
  @InjectManager()
  private _entityManager!: EntityManager;
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  public async findById(id: string): Promise<User | null> {
    try {
      const user = await this.repository.findOne({ where: { id } });

      return user;
    } catch (error: unknown) {
      logger.error(
        `An error occurred while finding user by id in repository. ${error}`
      );
      throw error;
    }
  }

  public async create(user: Partial<IUser>): Promise<IUserResponse> {
    try {
      const newUser = this.repository.create(user);

      return newUser;
    } catch (error: unknown) {
      logger.error(
        `An error occurred while creating user in repository. ${error}`
      );
      throw error;
    }
  }
}
