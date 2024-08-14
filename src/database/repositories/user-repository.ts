import { Repository } from "typeorm";
import User from "../enities/model-user";
import { AppDataSource } from "../data-source";
import { HttpException } from "@CRUD_PG/utils/http-exception";
import { StatusCode } from "@CRUD_PG/utils/consts";

export class UserRepository {
  private _repository: Repository<User>;
  private readonly _appDataSource: AppDataSource;
  public constructor() {
    this._appDataSource = AppDataSource.getInstance();
    this._repository = this._appDataSource.getRepository(User);
  }

  public findOne(id: number) {
    try {
      const user = this._repository.findOne({
        where: [
          {
            id,
          },
        ],
      });
      if (!user) {
        throw new HttpException("No user found.", StatusCode.NotFound);
      }
      return user;
    } catch (error: unknown) {
      if (error instanceof HttpException) {
        throw error;
      }
    }
  }
}
