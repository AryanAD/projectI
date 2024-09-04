import express from "express";
import {} from "../config/clientController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

export default router;
