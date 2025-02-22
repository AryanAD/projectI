import express from "express";

import {
  assignProjectToUser,
  getUserTasks,
  getTaskById,
  getAllTasks,
  updateTask,
  deleteTask,
} from "../../controllers/tasks/task.controller.js";
import { admin, protect } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/assign", protect, admin, assignProjectToUser);

router.get("/user/:userId", protect, admin, getUserTasks);

router.get("/:taskId", protect, admin, getTaskById);

router.get("/", protect, admin, getAllTasks);

router
  .route("/:taskId")
  .delete(protect, admin, deleteTask)
  .put(protect, admin, updateTask);

export default router;
