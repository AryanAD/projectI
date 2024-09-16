import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Project = sequelize.define(
  "Project",
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
        notEmpty: { msg: "Project name is required" },
      },
    },
    details: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Project details are required" },
      },
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Project category is required" },
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
    tableName: "projects",
  }
);

Project.hasMany(Task, { foreignKey: "projectId", as: "tasks" });
Task.belongsTo(Project, { foreignKey: "projectId", as: "project" });

export default Project;
