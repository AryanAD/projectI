import express from "express";
import formiddable from "express-formidable";

import {} from "../controllers/productController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware";
import checkId from "../middlewares/checkId.js";

const router = express.Router();

export default router;
