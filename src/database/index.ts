import { DataSource } from "typeorm";
import User from "./models/model-user";
import { getConfig } from "@project_name/utils/cofig";
const config = getConfig();
const AppDataSource = new DataSource({
  name: "default",
  type: "postgres",
  host: config.host, //"localhost",
  port: parseInt(config.dbport || "7000", 10), //7000,
  username: "postgres",
  password: config.password, //"sanvisal2302"
  database: config.database, //"Users",
  entities: [User],
  synchronize: true,
});

export default AppDataSource;
