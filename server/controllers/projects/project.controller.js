import asyncHandler from "../../middlewares/asyncHandler.js";
import ProjectCategory from "../../models/projects/category.model.js";
import Project from "../../models/projects/project.model.js";
import User from "../../models/users/user.model.js";

const fetchProjects = asyncHandler(async (req, res) => {
  const projects = await Project.findAll({
    include: [
      {
        model: ProjectCategory,
        attributes: ["name"],
      },
      {
        model: User,
        attributes: ["id", "username"],
        through: { attributes: [] },
      },
    ],
  });
  res.json(projects);
});

const addProject = asyncHandler(async (req, res) => {
  const { name, details, projectCategoryId, status, assignedToIds, deadline } =
    req.body;

  const assignedStaff = await User.findAll({
    where: {
      id: assignedToIds,
      role: "staff",
    },
  });

  if (assignedStaff.length !== assignedToIds.length) {
    res.status(400);
    throw new Error("One or more users are not staff members");
  }

  const project = await Project.create({
    name,
    details,
    projectCategoryId,
    status,
    deadline,
  });

  await project.addUsers(assignedStaff);

  res.status(201).json(project);
});

const fetchProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findByPk(req.params.id, {
    include: [
      {
        model: ProjectCategory,
        attributes: ["name"],
      },
      {
        model: User,
        attributes: ["id", "username"],
        through: { attributes: [] },
      },
    ],
  });

  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }

  res.json(project);
});

const updateProject = asyncHandler(async (req, res) => {
  const { name, details, projectCategoryId, status, assignedToIds, deadline } =
    req.body;

  const project = await Project.findByPk(req.params.id);

  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }

  if (assignedToIds) {
    const assignedStaff = await User.findAll({
      where: {
        id: assignedToIds,
        role: "staff",
      },
    });

    if (assignedStaff.length !== assignedToIds.length) {
      res.status(400);
      throw new Error("One or more users are not staff members");
    }

    await project.setUsers(assignedStaff);
  }

  project.name = name || project.name;
  project.details = details || project.details;
  project.projectCategoryId = projectCategoryId || project.projectCategoryId;
  project.status = status || project.status;
  project.deadline = deadline || project.deadline;

  await project.save();

  res.json(project);
});

const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findByPk(req.params.id);

  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }

  await project.destroy();

  res.json({ message: "Project deleted successfully" });
});

const fetchCategories = asyncHandler(async (req, res) => {
  const categories = await ProjectCategory.findAll();

  res.json(categories);
});

const addCategories = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const category = await ProjectCategory.create({ name });

  res.status(201).json(category);
});

const updateCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const category = await ProjectCategory.findByPk(req.params.id);

  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }

  category.name = name || category.name;

  await category.save();

  res.json(category);
});

const deleteCategory = asyncHandler(async (req, res) => {
  const category = await ProjectCategory.findByPk(req.params.id);

  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }

  await category.destroy();

  res.json({ message: "Category removed" });
});

export {
  fetchProjects,
  addProject,
  fetchProjectById,
  updateProject,
  deleteProject,
  fetchCategories,
  addCategories,
  updateCategory,
  deleteCategory,
};
