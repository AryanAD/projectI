import { Sequelize } from "sequelize";

const dbName = "projectone";
const dbUserName = "root";
const dbPassword = "1234";
const dbHost = "localhost";

const sequelize = new Sequelize(dbName, dbUserName, dbPassword, {
  host: dbHost,
  dialect: "mysql",
});

export default sequelize;
