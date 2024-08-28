import { Repository } from "typeorm";
import { Session } from "../entities/session.entity";
import { UpdatedResult } from "@AUTH/@types/common.type";
import { ISession } from "@AUTH/@types/session.type";
import { StatusCode } from "@AUTH/utils/consts";
import { HttpException } from "@AUTH/utils/http-exception";
import { logger } from "@AUTH/utils/logger";
import { validateOrReject, ValidationError } from "class-validator";
import { formatValidationErrors } from "@AUTH/utils/validation";
import { SessionStatus } from "@AUTH/utils/consts/enum-column";

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

  public async findByAccessToken(accessToken: string): Promise<Session | null> {
    try {
      const session = await this.repository.findOne({
        where: {
          accessToken,
          isDeleted: false,
          status: SessionStatus.active,
        },
      });

      return session;
    } catch (error: unknown) {
      logger.error(`Failed to find session by access token. Error: ${error}`);
      throw error;
    }
  }

  public async findByRefreshToken(
    refreshToken: string
  ): Promise<Session | null> {
    try {
      const session = await this.repository.findOne({
        where: {
          refreshToken,
        },
      });

      return session;
    } catch (error: unknown) {
      logger.error(`Failed to find session by refresh token. Error: ${error}`);
      throw error;
    }
  }

  public async create(session: ISession): Promise<Session> {
    try {
      const newSession = this.repository.create(session);

      await validateOrReject(newSession);

      return await this.repository.save(newSession);
    } catch (error: unknown) {
      logger.error(`Failed to create session. Error: ${error}`);
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

  public async save(session: Partial<Session>): Promise<Session | null> {
    try {
      const savedSession = await this.repository.save(session);

      return savedSession;
    } catch (error: unknown) {
      logger.error(`Failed to save session. Error: ${error}`);
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
  ): Promise<Session | null> {
    try {
      // Step 1: Retrieve the entity from the database
      const existingSession = await this.repository.findOneOrFail({
        where: { id, isDeleted: false },
      });

      // Step 2: Merge the updates into the existing entity
      const updatedSession = this.repository.merge(
        existingSession,
        partialSession
      );

      // Step 3: Validate the merged entity
      await validateOrReject(updatedSession);

      // Step 4: Save the updated entity
      return await this.repository.save(updatedSession);
    } catch (error: unknown) {
      logger.error(`Failed to update session by id: ${id}. Error: ${error}`);
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
