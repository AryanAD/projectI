import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();

import path from "path";
import cookieParser from "cookie-parser";
import sequelize from "./config/database.js";

// Routes
import userRoutes from "./routes/userRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";
import clientCategoryRoutes from "./routes/clientCategoryRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import uploadRoutes from "../server/routes/uploadRoutes.js";

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
app.use("/api/users", userRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/client-category", clientCategoryRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/uploads", uploadRoutes);

// Image Uploads
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
