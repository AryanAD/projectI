import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";

// Protect routes
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.cookie && req.headers.cookie.startsWith("jwt")) {
    try {
      token = req.headers.cookie.split("=")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findByPk(decoded.userId, {
        attributes: ["id", "username", "email", "role"],
      });

      if (!req.user) {
        res.status(401);
        throw new Error("Not authorized, user not found");
      }

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

// Admin middleware
const admin = (req, res, next) => {
  if (req.user && req.user.dataValues.role === "admin") {
    console.log(req.user.dataValues.role, "userRole is Admin");
    next();
  } else {
    res.status(403);
    throw new Error("Not authorized as admin");
  }
};

export { protect, admin };
