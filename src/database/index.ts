import { DataSource } from "typeorm";
import User from "./models/model-user";
import { getConfig } from "@project_name/utils/cofig";
const config = getConfig();
const AppDataSource = new DataSource({
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

export default AppDataSource;
