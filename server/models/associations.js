import Project from "./projects/project.model.js";
import User from "./users/user.model.js";

User.belongsToMany(Project, {
  through: "project_assigned_to",
  foreignKey: "userId",
});

Project.belongsToMany(User, {
  through: "project_assigned_to",
  foreignKey: "projectId",
});
