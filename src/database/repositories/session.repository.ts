import { Repository } from "typeorm";
import { Session } from "../entities/session.entity";
import { UpdatedResult } from "@AUTH/@types/common.type";
import { ISession } from "@AUTH/@types/session.type";
import { StatusCode } from "@AUTH/utils/consts";
import { HttpException } from "@AUTH/utils/http-exception";
import { logger } from "@AUTH/utils/logger";

export class SessionRepository {
  constructor(private repository: Repository<Session>) {}

  public async findById(id: string): Promise<Session | null> {
    try {
      return await this.repository.findOne({
        where: { id, isDeleted: false },
      });
    } catch (error: unknown) {
      logger.error(`Failed to find session by id: ${id}. Error: ${error}`);
      throw error;
    }
  }

  public async create(session: Partial<ISession>): Promise<Session> {
    try {
      const newSession = this.repository.create(session);
      return await this.repository.save(newSession);
    } catch (error: unknown) {
      logger.error(`Failed to create session. Error: ${error}`);
      throw error;
    }
  }

  public async findAll(): Promise<Session[]> {
    try {
      return await this.repository.find({
        where: { isDeleted: false },
      });
    } catch (error: unknown) {
      logger.error(`Failed to retrieve all sessions. Error: ${error}`);
      throw error;
    }
  }

  public async updateById(
    id: string,
    partialSession: Partial<ISession>
  ): Promise<UpdatedResult> {
    try {
      const existingSession = await this.findById(id);

      if (!existingSession) {
        throw new HttpException("Session not found.", StatusCode.NotFound);
      }
      const updateResult = await this.repository.update(id, partialSession);
      return {
        affected: updateResult.affected,
        generatedMaps: updateResult.generatedMaps,
        raw: updateResult.raw,
      };
    } catch (error: unknown) {
      logger.error(`Failed to update session by id: ${id}. Error: ${error}`);
      throw error;
    }
  }

  public async softDelete(id: string): Promise<UpdatedResult> {
    try {
      const existingSession = await this.findById(id);

      if (!existingSession) {
        throw new HttpException("Session not found.", StatusCode.NotFound);
      }

      const deleteResult = await this.repository.update(id, {
        isDeleted: true,
      });

      return {
        affected: deleteResult.affected,
        generatedMaps: deleteResult.generatedMaps,
        raw: deleteResult.raw,
      };
    } catch (error: unknown) {
      logger.error(
        `Failed to soft delete session by id: ${id}. Error: ${error}`
      );
      throw error;
    }
  }
}
