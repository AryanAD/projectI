import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";
import User from "../users/user.model.js";
import Project from "../projects/project.model.js";

const Task = sequelize.define(
  "Task",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Project,
        key: "id",
      },
    },
    status: {
      type: DataTypes.ENUM("todo", "doing", "done"),
      defaultValue: "todo",
      allowNull: false,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    priority: {
      type: DataTypes.ENUM("low", "medium", "high"),
      defaultValue: "low",
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "tasks",
  }
);

const TaskUsers = sequelize.define(
  "TaskUsers",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    taskId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Task,
        key: "id",
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    timestamps: false,
    tableName: "task_users",
  }
);

Task.belongsToMany(User, { through: TaskUsers, foreignKey: "taskId" });
User.belongsToMany(Task, { through: TaskUsers, foreignKey: "userId" });

Task.belongsTo(Project, { foreignKey: "projectId", onDelete: "CASCADE" });
Project.hasMany(Task, { foreignKey: "projectId" });

export { Task, TaskUsers };
