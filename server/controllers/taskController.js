import asyncHandler from "../middlewares/asyncHandler.js";
import Task from "../models/taskModel.js";
import User from "../models/userModel.js";

const fetchTasks = asyncHandler(async (req, res) => {
  const { role, id } = req.user;

  let tasks;
  if (role === "admin") {
    tasks = await Task.findAll({
      include: {
        model: User,
        as: "assignedUser",
        attributes: ["id", "username", "email", "role"],
      },
    });
  } else if (role === "staff") {
    tasks = await Task.findAll({
      where: { assignedTo: id },
      include: {
        model: User,
        as: "assignedUser",
        attributes: ["id", "username", "email", "role"],
      },
    });
  }

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

  // Broadcast task creation
  req.io.emit("task-created", task);

  res.status(201).json(task);
});

const updateTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description, assignedTo, status } = req.body;

  const task = await Task.findByPk(id);
  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  if (name) task.name = name;
  if (description) task.description = description;
  if (status) task.status = status;

  if (assignedTo) {
    const assignedUser = await User.findByPk(assignedTo);
    if (!assignedUser || assignedUser.role !== "staff") {
      res.status(400);
      throw new Error("The task must be assigned to a staff member");
    }
    task.assignedTo = assignedTo;
  }

  await task.save();

  // Broadcast task update
  req.io.emit("task-updated", task);

  res.json({ message: "Task updated successfully", task });
});

const deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const task = await Task.findByPk(id);
  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  await task.destroy();

  // Broadcast task deletion
  req.io.emit("task-deleted", { id });

  res.json({ message: "Task deleted successfully" });
});

export { fetchTasks, assignTask, updateTask, deleteTask };
