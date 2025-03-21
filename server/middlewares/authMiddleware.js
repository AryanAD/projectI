import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/users/user.model.js";

const protect = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (token) {
    try {
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
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

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
