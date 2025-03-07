import { getConfig } from "@AUTH/utils/cofig";
import { logger } from "@AUTH/utils/logger";
import { DataSource } from "typeorm";

const config = getConfig();

export const AppDataSource = new DataSource({
  name: "default",
  type: "postgres",
  host: config.host,
  port: parseInt(config.dbport || "7000", 10),
  username: config.username,
  password: config.password,
  database: config.database,
  logging: config.dbLog === "debug",
  entities: [`${__dirname}/entities/*.entity.{ts,js}`],
  synchronize: true,
  migrations: [`${__dirname}/migrations/*.{ts,js}`],
});

// Ensure this is only executed during application runtime
if (require.main === module) {
  AppDataSource.initialize()
    .then(() => logger.info("Data Source has been initialized!"))
    .catch((err) =>
      logger.error("Error during Data Source initialization", err)
    );
}
