import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";
import User from "../users/user.model.js";
import Project from "../projects/project.model.js";
import Client from "../clients/client.model.js";

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
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Client,
        key: "id",
      },
    },
    status: {
      type: DataTypes.ENUM("todo", "doing", "done"),
      defaultValue: "todo",
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

Task.belongsTo(Client, { foreignKey: "clientId", onDelete: "CASCADE" });
Client.hasMany(Task, { foreignKey: "clientId" });

export { Task, TaskUsers };
