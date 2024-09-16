import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js";

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body;

  const userExists = await User.findOne({ where: { email } });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    role: role || "staff",
  });

  if (user) {
    createToken(res, user.id);

    res.status(201).json({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });

  if (user && (await bcrypt.compare(password, user.password))) {
    createToken(res, user.id);

    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out successfully" });
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.findAll({
    attributes: ["id", "username", "email", "role", "createdAt", "updatedAt"],
  });

  res.json(users);
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    attributes: ["id", "username", "email", "role", "createdAt", "updatedAt"],
  });

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.params.id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.role = req.body.role || user.role;

    const updatedUser = await user.save();

    res.json({
      id: updatedUser.id,
      username: updatedUser.username,
      email: updatedUser.email,
      role: updatedUser.role,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.params.id);

  if (user) {
    if (user.role === "admin") {
      res.status(400);
      throw new Error("Cannot delete an admin user");
    }

    await user.destroy();
    res.json({ message: "User deleted successfully" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.user.id, {
    attributes: ["id", "username", "email", "role", "createdAt", "updatedAt"],
  });

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.user.id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedUser = await user.save();

    res.json({
      id: updatedUser.id,
      username: updatedUser.username,
      email: updatedUser.email,
      role: updatedUser.role,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  registerUser,
  loginUser,
  logoutUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserProfile,
  updateUserProfile,
};
