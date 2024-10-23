import Project from "./projectModel.js";
import User from "./userModel.js";

// Define the many-to-many relationship here
User.belongsToMany(Project, {
  through: "project_assigned_to", // Join table
  foreignKey: "userId",
});

Project.belongsToMany(User, {
  through: "project_assigned_to",
  foreignKey: "projectId",
});
