import express from "express";
import {
  fetchProjects,
  addProject,
  fetchProjectById,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// router
//   .route("/")
//   .get(protect, admin, fetchProjects)
//   .post(protect, admin, addProject);

// router
//   .route("/:id")
//   .get(protect, admin, fetchProjectById)
//   .put(protect, admin, updateProject)
//   .delete(protect, admin, deleteProject);

router.route("/").get(fetchProjects).post(addProject);

router
  .route("/:id")
  .get(fetchProjectById)
  .put(updateProject)
  .delete(deleteProject);

export default router;
