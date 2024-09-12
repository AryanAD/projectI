import asyncHandler from "../middlewares/asyncHandler.js";
import Task from "../models/taskModel.js";
import User from "../models/userModel.js";

const fetchTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.findAll({
    include: {
      model: User,
      as: "assignedUser",
      attributes: ["id", "username", "email", "role"],
    },
  });
  res.json(tasks);
});

const assignTask = asyncHandler(async (req, res) => {
  const { name, description, assignedTo, status } = req.body;

  const assignedUser = await User.findByPk(assignedTo);

  if (!assignedUser || assignedUser.role !== "staff") {
    res.status(400);
    throw new Error("The task must be assigned to a staff member");
  }

  const task = await Task.create({
    name,
    description,
    assignedTo,
    status: status || "todo",
  });

  res.status(201).json(task);
});

const fetchTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findByPk(req.params.id, {
    include: {
      model: User,
      as: "assignedUser",
      attributes: ["id", "username", "email", "role"],
    },
  });

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  res.json(task);
});

const updateTask = asyncHandler(async (req, res) => {
  const { name, description, assignedTo, status } = req.body;

  const task = await Task.findByPk(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  if (assignedTo) {
    const assignedUser = await User.findByPk(assignedTo);

    if (!assignedUser || assignedUser.role !== "staff") {
      res.status(400);
      throw new Error("The task must be assigned to a staff member");
    }

    task.assignedTo = assignedTo;
  }

  task.name = name || task.name;
  task.description = description || task.description;

  if (status) {
    if (!["todo", "doing", "done"].includes(status)) {
      res.status(400);
      throw new Error("Invalid status value");
    }
    task.status = status;
  }

  await task.save();

  res.json(task);
});

const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findByPk(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  await task.destroy();

  res.json({ message: "Task deleted successfully" });
});

export { fetchTasks, assignTask, fetchTaskById, updateTask, deleteTask };
