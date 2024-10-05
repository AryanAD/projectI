import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

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
        notEmpty: { msg: "Name is required" },
      },
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: { msg: "Must be a valid URL" },
      },
    },
    details: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Client details are required" },
      },
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Client category is required" },
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^\d{10}$/,
        notEmpty: { msg: "Client phone number is required" },
      },
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Client address is required" },
      },
    },
  },
  {
    timestamps: true,
    tableName: "clients",
  }
);

export default Client;
