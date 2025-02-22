import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";
import ClientCategory from "./category.model.js";

const Client = sequelize.define(
  "Client",
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
        notEmpty: { msg: "Client name is required" },
      },
    },
    details: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Client details are required" },
      },
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: { msg: "Must be a valid email address" },
        notEmpty: { msg: "Email is required" },
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^\d{10}$/,
        notEmpty: { msg: "Phone number is required" },
      },
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Location is required" },
      },
    },
    priority: {
      type: DataTypes.ENUM("normal", "high", "very high"),
      allowNull: false,
      defaultValue: "normal",
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    clientCategoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: ClientCategory,
        key: "id",
      },
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "clients",
  }
);

Client.belongsTo(ClientCategory, { foreignKey: "clientCategoryId" });

export default Client;
