import express from "express";
import {
  fetchTasks,
  assignTask,
  fetchTaskById,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(protect, admin, fetchTasks)
  .post(protect, admin, assignTask);

router
  .route("/:id")
  .get(protect, admin, fetchTaskById)
  .put(protect, admin, updateTask)
  .delete(protect, admin, deleteTask);

export default router;
