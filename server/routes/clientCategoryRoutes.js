import express from "express";

import {
  fetchCategories,
  addCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/clientController.js";

import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(protect, admin, fetchCategories)
  .post(protect, admin, addCategories);
// router.route("/").get(fetchCategories).post(addCategories);

router
  .route("/:id")
  .put(protect, admin, updateCategory)
  .delete(protect, admin, deleteCategory);
// router.route("/:id").put(updateCategory).delete(deleteCategory);

export default router;
