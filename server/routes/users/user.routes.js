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
} from "../../controllers/users/user.controller.js";
import { protect, admin } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").post(registerUser).get(protect, admin, getUsers);

router.post("/login", loginUser);
router.post("/logout", logoutUser);

router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router
  .route("/:id")
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)
  .delete(protect, admin, deleteUser);

export default router;
