import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Task = sequelize.define(
  "Task",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Task name is required" },
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Task description is required" },
      },
    },
    assignedTo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Task must be assigned to a staff" },
      },
    },
    status: {
      type: DataTypes.ENUM("todo", "doing", "done"),
      allowNull: false,
      defaultValue: "todo",
    },
  },
  {
    timestamps: true,
    tableName: "tasks",
  }
);

export default Task;
