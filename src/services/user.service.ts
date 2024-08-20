import { IUserResponse } from "@CRUD_PG/@types/user.type";
import { UserRepository } from "@CRUD_PG/database/repositories/user.repository";
import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";

@Service()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private repository: UserRepository
  ) {}

  public async findUser(id: string): Promise<IUserResponse | null> {
    try {
      const user = await this.repository.findById(id);

      return user;
    } catch (error: unknown) {
      throw error;
    }
  }
}
