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
router.post("/", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

// Protected routes
router
  .get("/profile", protect, getUserProfile)
  .put("/profile", protect, updateUserProfile);

// Admin routes
router.get("/", protect, admin, getUsers);
router.get("/:id", protect, admin, getUserById);
router.put("/:id", protect, admin, updateUser);
router.delete("/:id", protect, admin, deleteUser);

export default router;
