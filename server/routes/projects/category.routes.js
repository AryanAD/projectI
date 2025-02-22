import express from "express";
import {
  addCategories,
  deleteCategory,
  fetchCategories,
  updateCategory,
} from "../../controllers/projects/project.controller.js";
import { admin, protect } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(protect, admin, fetchCategories)
  .post(protect, admin, addCategories);

router
  .route("/:id")
  .put(protect, admin, updateCategory)
  .delete(protect, admin, deleteCategory);

export default router;
