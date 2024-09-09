import express from "express";
import {
  fetchProjects,
  addProject,
  fetchProductById,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(protect, admin, fetchProjects)
  .post(protect, admin, addProject);

router
  .route("/:id")
  .get(protect, admin, fetchProductById)
  .put(protect, admin, updateProject)
  .delete(protect, admin, deleteProject);

export default router;
