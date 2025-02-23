import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();

import cors from "cors";
app.use(
  cors({
    credentials: true,
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

import path from "path";
import cookieParser from "cookie-parser";
import sequelize from "./config/database.js";

// Routes
import userRoutes from "./routes/users/user.routes.js";

import clientRoutes from "./routes/clients/client.routes.js";
import clientCategoryRoutes from "./routes/clients/category.routes.js";

import projectRoutes from "./routes/projects/project.routes.js";
import projectCategoryRoutes from "./routes/projects/category.routes.js";

import taskRoutes from "./routes/tasks/task.routes.js";
import staffRoutes from "./routes/staff/staff.routes.js";

import uploadRoutes from "./routes/uploads/upload.routes.js";

// Associations
import "./models/associations.js";

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Test DB Connection
sequelize
  .authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: " + err));

// Sync Database
sequelize
  .sync()
  .then(() => console.log("Database synced"))
  .catch((err) => console.log("Error: " + err));

// Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/clients", clientRoutes);
app.use("/api/v1/client-category", clientCategoryRoutes);
app.use("/api/v1/projects", projectRoutes);
app.use("/api/v1/project-category", projectCategoryRoutes);
app.use("/api/v1/tasks", taskRoutes);
app.use("/api/v1/staffs", staffRoutes);
app.use("/api/v1/uploads", uploadRoutes);

// Image Uploads
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
