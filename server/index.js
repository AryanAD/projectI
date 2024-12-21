import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();

import { Server as SocketIOServer } from "socket.io";
import http from "http";
const server = http.createServer(app);
const io = new SocketIOServer(server, { cors: { origin: "*" } });

import path from "path";
import cookieParser from "cookie-parser";
import sequelize from "./config/database.js";

// Routes
import userRoutes from "./routes/userRoutes.js";

import clientRoutes from "./routes/clientRoutes.js";
import clientCategoryRoutes from "./routes/clientCategoryRoutes.js";

import projectRoutes from "./routes/projectRoutes.js";
import projectCategoryRoutes from "./routes/projectCategoryRoutes.js";

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
app.use("/api/project-category", projectCategoryRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/uploads", uploadRoutes);

// Image Uploads
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Websocket Event Handlers
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Broadcast changes
const broadcastTaskChange = (event, data) => {
  io.emit("task-change", { event, data });
};

// Pass broadcast function to routes
app.set("broadcastTaskChange", broadcastTaskChange);

// Start Server with WebSocket Support
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
