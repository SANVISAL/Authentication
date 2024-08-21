import { ISession } from "@CRUD_PG/@types/session.type";
import { logger } from "@CRUD_PG/utils/logger";
import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Session } from "../entities/session.entity";
import { Validate } from "class-validator";
import { UpdatedResult } from "@CRUD_PG/@types/common.type";
import { HttpException } from "@CRUD_PG/utils/http-exception";
import { StatusCode } from "@CRUD_PG/utils/consts";

@Service()
export class SessionRepository {
  // @InjectManager()
  // private _entityManager!: EntityManager;
  constructor(
    @InjectRepository(Session) private repository: Repository<Session>
  ) {}

  public async findById(id: string): Promise<Session | null> {
    try {
      const session = await this.repository.findOne({
        where: { id, isDeleted: false },
      });

      return session;
    } catch (error: unknown) {
      logger.error(
        `An error occurred while finding sesssion by id in repository. ${error}`
      );
      throw error;
    }
  }

  public async create(session: Partial<ISession>): Promise<Session> {
    try {
      Validate(Session);
      const newSession = this.repository.create(session);

      return newSession;
    } catch (error: unknown) {
      logger.error(
        `An error occurred while creating session in repository. ${error}`
      );
      throw error;
    }
  }

  public async findAll(): Promise<Session[]> {
    try {
      const session = await this.repository.find({
        where: { isDeleted: false },
      });

      return session;
    } catch (error: unknown) {
      logger.error(
        `An error occurred while finding all sessions in repository. ${error}`
      );
      throw error;
    }
  }

  public async updateById(
    id: string,
    partialSession: Partial<ISession>
  ): Promise<UpdatedResult> {
    try {
      const updatedSession = await this.repository.update(id, partialSession);

      const updateResult: UpdatedResult = {
        affected: updatedSession.affected,
        generatedMaps: updatedSession.generatedMaps,
        raw: updatedSession.raw,
      };

      return updateResult;
    } catch (error: unknown) {
      logger.error(
        `An error occurred while updating session in repository. ${error}`
      );

      throw error;
    }
  }

  public async softDelete(id: string): Promise<UpdatedResult> {
    try {
      const existingSession = await this.findById(id);

      if (!existingSession) {
        throw new HttpException("User not found.", StatusCode.NotFound);
      }
      const deletedSession = await this.repository.update(id, {
        isDeleted: true,
      });

      const deletedResult: UpdatedResult = {
        affected: deletedSession.affected,
        generatedMaps: deletedSession.generatedMaps,
        raw: deletedSession.generatedMaps,
      };

      return deletedResult;
    } catch (error: unknown) {
      logger.error(
        `An error occurred while soft deleting session in repository. ${error}`
      );
      throw error;
    }
  }
}
