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
  .route("/")
  // .get(getUsers)
  .post(registerUser)
  .get(protect, admin, getUsers);

router.post("/login", loginUser);
router.post("/logout", logoutUser);

// Protected routes
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
// .get(getUserProfile)
// .put(updateUserProfile);

// Admin routes
router
  .route("/:id")
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)
  .delete(protect, admin, deleteUser);

// .get(getUserById)
// .put(updateUser)
// .delete(deleteUser);

export default router;
