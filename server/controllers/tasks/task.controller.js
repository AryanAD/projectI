import asyncHandler from "../../middlewares/asyncHandler.js";
import Client from "../../models/clients/client.model.js";
import Project from "../../models/projects/project.model.js";
import { Task, TaskUsers } from "../../models/tasks/task.model.js";
import User from "../../models/users/user.model.js";

const assignProjectToUser = asyncHandler(async (req, res) => {
  const { title, description, status, userIds, projectId, clientId } = req.body;

  const task = await Task.create({
    title,
    description,
    status,
    projectId,
    clientId,
  });

  await Promise.all(
    userIds.map((userId) =>
      TaskUsers.create({
        taskId: task.id,
        userId,
      })
    )
  );

  res.status(201).json(task);
});

const getUserTasks = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const tasks = await Task.findAll({ where: { userId } });
  res.json(tasks);
});

const getTaskById = asyncHandler(async (req, res) => {
  const { taskId } = req.params;

  const task = await Task.findByPk(taskId, {
    include: [
      { model: User, attributes: ["id", "username", "email"] },
      { model: Project, attributes: ["id", "name", "status"] },
      { model: Client, attributes: ["id", "name", "priority"] },
    ],
  });

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  res.json(task);
});

const getAllTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.findAll({
    include: [
      { model: User, attributes: ["id", "username", "email"] },
      { model: Project, attributes: ["id", "name", "status"] },
      { model: Client, attributes: ["id", "name", "priority"] },
    ],
  });

  res.json(tasks);
});

const updateTask = asyncHandler(async (req, res) => {
  const { taskId } = req.params;
  const { title, description, status, userIds, projectId, clientId } = req.body;

  const task = await Task.findByPk(taskId);
  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  task.title = title || task.title;
  task.description = description || task.description;
  task.status = status || task.status;
  task.projectId = projectId || task.projectId;
  task.clientId = clientId || task.clientId;

  if (userIds && Array.isArray(userIds)) {
    await task.setUsers(userIds);
  }

  await task.save();

  const updatedTask = await Task.findByPk(taskId, {
    include: [{ model: User, attributes: ["id", "username"] }],
  });

  res.json(updatedTask);
});

const deleteTask = asyncHandler(async (req, res) => {
  const { taskId } = req.params;

  const task = await Task.findByPk(taskId);
  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  await task.destroy();
  res.json({ message: "Task deleted successfully" });
});

export {
  assignProjectToUser,
  getUserTasks,
  getTaskById,
  getAllTasks,
  updateTask,
  deleteTask,
};
