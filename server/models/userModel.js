import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Username is required" },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Email address already in use",
      },
      validate: {
        isEmail: { msg: "Must be a valid email address" },
        notEmpty: { msg: "Email is required" },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Password is required" },
        len: {
          args: [6, 100],
          msg: "Password must be at least 6 characters long",
        },
      },
    },
    role: {
      type: DataTypes.ENUM("staff", "admin"),
      allowNull: false,
      defaultValue: "staff",
    },
    profilePicture: {
      type: DataTypes.STRING, // Assuming you store the image path or URL
      allowNull: true, // Profile picture is optional
    },
  },
  {
    timestamps: true,
    tableName: "users",
  }
);

export default User;
