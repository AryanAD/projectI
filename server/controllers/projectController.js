import asyncHandler from "../middlewares/asyncHandler.js";
import Project from "../models/projectModel.js";

const fetchProjects = asyncHandler(async (req, res) => {
  const projects = await Project.findAll();
  res.json(projects);
});

const addProject = asyncHandler(async (req, res) => {
  const { name, details, category, status } = req.body;

  const project = await Project.create({
    name,
    details,
    category,
    status,
  });

  res.status(201).json(project);
});

const fetchProductById = asyncHandler(async (req, res) => {
  const project = await Project.findByPk(req.params.id);

  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }

  res.json(project);
});

const updateProject = asyncHandler(async (req, res) => {
  const { name, details, category, status } = req.body;

  const project = await Project.findByPk(req.params.id);

  if (!project) {
    res.status(404);
    throw new Error("Project not found");
  }

  project.name = name || project.name;
  project.details = details || project.details;
  project.category = category || project.category;
  project.status = status || project.status;

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

export {
  fetchProjects,
  addProject,
  fetchProductById,
  updateProject,
  deleteProject,
};
