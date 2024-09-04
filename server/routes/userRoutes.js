import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public routes
router
  .post("/", registerUser)
  .post("/login", loginUser)
  .post("/logout", logoutUser);

// Protected routes
router
  .get("/profile", protect, getUserProfile)
  .put("/profile", protect, updateUserProfile);

// Admin routes
router
  .get("/", protect, admin, getUsers)
  .get("/:id", protect, admin, getUserById)
  .put("/:id", protect, admin, updateUser)
  .delete("/:id", protect, admin, deleteUser);

export default router;
