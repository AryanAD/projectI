import { Sequelize } from "sequelize";

const dbName = "projectone";
const dbUserName = "root";
const dbPassword = "";
const dbHost = "localhost";

const sequelize = new Sequelize(dbName, dbUserName, dbPassword, {
  host: dbHost,
  dialect: "mysql",
});

export default sequelize;
