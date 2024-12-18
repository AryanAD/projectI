import express from "express";
import Notification from "../models/notificationModel.js";
import { protect } from "../middlewares/authMiddleware.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const router = express.Router();

router.get(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const notifications = await Notification.findAll({
      where: { userId: req.user.id, read: false },
      order: [["createdAt", "DESC"]],
    });
    res.json(notifications);
  })
);

router.put(
  "/:id/read",
  protect,
  asyncHandler(async (req, res) => {
    const notification = await Notification.findByPk(req.params.id);

    if (!notification || notification.userId !== req.user.id) {
      res.status(404);
      throw new Error("Notification not found");
    }

    notification.read = true;
    await notification.save();
    res.json({ message: "Notification marked as read" });
  })
);

export default router;
