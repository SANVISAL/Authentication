import { getConfig } from "@AUTH/utils/cofig";
import { logger } from "@AUTH/utils/logger";
import { DataSource, EntityTarget, Repository, ObjectLiteral } from "typeorm";

export class AppDataSource {
  private static _instance: AppDataSource;
  private readonly _dataSource: DataSource;
  private readonly _config = getConfig();

  private constructor() {
    this._dataSource = new DataSource({
      name: "default",
      type: "postgres",
      host: this._config.host,
      port: parseInt(this._config.dbport || "7000", 10),
      username: this._config.username,
      password: this._config.password,
      database: this._config.database,
      logging: this._config.dbLog === "debug",
      entities: [`${__dirname}/entities/*.entity.{ts,js}`],
      synchronize: true,
      subscribers: [],
      migrations: [`${__dirname}/migrations/*.{ts,js}`],
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

  public getDataSource(): DataSource {
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
