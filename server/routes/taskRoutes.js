import express from "express";
import {
  fetchTasks,
  assignTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// staff and admin routes
router.get("/", protect, fetchTasks);

// admin routes
router.post("/", protect, admin, assignTask);
router.put("/:id", protect, admin, updateTask);
router.delete("/:id", protect, admin, deleteTask);

export default router;
