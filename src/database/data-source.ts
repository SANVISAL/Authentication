import { DataSource, EntityTarget, Repository, ObjectLiteral } from "typeorm";
import { logger } from "@CRUD_PG/utils/logger";
import { getConfig } from "@CRUD_PG/utils/cofig";
import User from "./enities/user.entity";

const config = getConfig();

export class AppDataSource {
  private static _instance: AppDataSource;
  private readonly _dataSource: DataSource;

  private constructor() {
    this._dataSource = new DataSource({
      name: "default",
      type: "postgres",
      host: config.host,
      port: parseInt(config.dbport || "7000", 10),
      username: "postgres",
      password: config.password,
      database: config.database,
      entities: [User],
      synchronize: true,
    });
  }

  public static getInstance(): AppDataSource {
    if (!this._instance) {
      this._instance = new AppDataSource();
    }
    return this._instance;
  }

  public static resetInstance(): void {
    this._instance = new AppDataSource();
  }

  public async initialize(): Promise<void> {
    if (!this._dataSource.isInitialized) {
      await this._dataSource.initialize();
      logger.info("Data Source has been initialized!");
    } else {
      logger.info("Data Source is already initialized.");
    }
  }

  public async destroy(): Promise<void> {
    if (this._dataSource.isInitialized) {
      await this._dataSource.destroy();
      logger.info("Data Source has been destroyed.");
    } else {
      logger.info("Data Source is not initialized.");
    }
  }

  public async getDataSource(): Promise<DataSource> {
    if (!this._dataSource.isInitialized) {
      await this.initialize(); // Use the existing initialize method
    }
    return this._dataSource;
  }

  public isInitialized(): boolean {
    return this._dataSource.isInitialized;
  }

  public getRepository<Entity extends ObjectLiteral>(
    entity: EntityTarget<Entity>
  ): Repository<Entity> {
    if (!this._dataSource.isInitialized) {
      this.initialize();
    }
    return this._dataSource.getRepository(entity);
  }
}
