import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import ProjectCategory from "./projectCategoryModel.js";

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
    projectCategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ProjectCategory,
        key: "id",
      },
    },
    status: {
      type: DataTypes.ENUM("todo", "doing", "done"),
      allowNull: false,
      defaultValue: "todo",
    },

    deadline: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "project",
  }
);

Project.belongsTo(ProjectCategory, { foreignKey: "projectCategoryId" });

export default Project;
