import express from "express";
import {
  fetchProjects,
  addProject,
  fetchProjectById,
  updateProject,
  deleteProject,
} from "../../controllers/projects/project.controller.js";
import { admin, protect } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(protect, admin, fetchProjects)
  .post(protect, admin, addProject);

router
  .route("/:id")
  .get(protect, admin, fetchProjectById)
  .put(protect, admin, updateProject)
  .delete(protect, admin, deleteProject);

export default router;
