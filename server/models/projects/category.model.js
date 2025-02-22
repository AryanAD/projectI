import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";

const ProjectCategory = sequelize.define(
  "ProjectCategory",
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
    tableName: "project_categories",
  }
);

export default ProjectCategory;
