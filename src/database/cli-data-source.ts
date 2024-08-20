import { DataSource } from "typeorm";
import { logger } from "@CRUD_PG/utils/logger";
import { getConfig } from "@CRUD_PG/utils/cofig";

const config = getConfig();

export const AppDataSource = new DataSource({
  name: "default",
  type: "postgres",
  host: config.host,
  port: parseInt(config.dbport || "7000", 10),
  username: config.username,
  password: config.password,
  database: config.database,
  logging: true,
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
