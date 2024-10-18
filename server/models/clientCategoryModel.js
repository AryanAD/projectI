import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const ClientCategory = sequelize.define(
  "ClientCategory",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Category name is required" },
      },
    },
  },
  {
    timestamps: true,
    tableName: "client_categories",
  }
);

export default ClientCategory;
