import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./userModel.js";

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
      references: {
        model: User,
        key: "id",
      },
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

Task.belongsTo(User, { foreignKey: "assignedTo", as: "assignedUser" });
Task.belongsTo(Project, { foreignKey: "projectId", as: "project" });

export default Task;
