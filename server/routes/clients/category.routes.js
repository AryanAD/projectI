import express from "express";
import { admin, protect } from "../../middlewares/authMiddleware.js";
import {
  addCategories,
  deleteCategory,
  fetchCategories,
  updateCategory,
} from "../../controllers/clients/client.controller.js";

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
