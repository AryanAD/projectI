import express from "express";
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import sequelize from "./config/db.js";

// Routes
import userRoutes from "./routes/userRoutes.js";
// import productRoutes from "./routes/productRoutes.js";
// import orderRoutes from "./routes/orderRoutes.js";
// import categoryRoutes from "./routes/categoryRoutes.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

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
// app.use("/api/products", productRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/categories", categoryRoutes);

// Static Files
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// Error Handling Middleware (optional)
// app.use(notFound);
// app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
