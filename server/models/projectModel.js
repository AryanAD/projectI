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
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [["todo", "doing", "done"]],
          msg: "Status must be either 'todo', 'doing', or 'done'",
        },
        notEmpty: { msg: "Project status is required" },
      },
    },
  },
  {
    timestamps: true,
    tableName: "projects",
  },
  {
    hooks: {
      beforeCreate: (project) => {
        if (project.status) {
          project.status = project.status.toLowerCase().trim();
        }
      },
      beforeUpdate: (project) => {
        if (project.status) {
          project.status = project.status.toLowerCase().trim();
        }
      },
    },
  }
);

export default Project;
