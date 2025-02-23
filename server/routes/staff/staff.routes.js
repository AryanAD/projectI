import express from "express";
import {
  getTasksForStaff,
  updateTasksStatusForStaff,
} from "../../controllers/staff/staff.controller.js";
const router = express.Router();

router.get("/:id", getTasksForStaff);
router.put("/:id", updateTasksStatusForStaff);

export default router;
