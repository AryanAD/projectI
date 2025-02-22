import asyncHandler from "../../middlewares/asyncHandler.js";
import ClientCategory from "../../models/clients/category.model.js";
import Client from "../../models/clients/client.model.js";

const fetchClients = asyncHandler(async (req, res) => {
  const clients = await Client.findAll({
    include: [
      {
        model: ClientCategory,
        attributes: ["name"],
      },
    ],
  });

  res.json(clients);
});

const fetchClientById = asyncHandler(async (req, res) => {
  const client = await Client.findByPk(req.params.id, {
    include: [
      {
        model: ClientCategory,
        attributes: ["name"],
      },
    ],
  });

  if (!client) {
    res.status(404);
    throw new Error("Client not found");
  }

  res.json(client);
});

const addClient = asyncHandler(async (req, res) => {
  const {
    name,
    details,
    email,
    phone,
    location,
    priority,
    startDate,
    endDate,
    clientCategoryId,
    logo,
  } = req.body;

  const client = await Client.create({
    name,
    details,
    email,
    phone,
    location,
    priority,
    startDate,
    endDate,
    clientCategoryId,
    logo,
  });

  res.status(201).json(client);
});

const updateClient = asyncHandler(async (req, res) => {
  const {
    name,
    details,
    email,
    phone,
    location,
    priority,
    startDate,
    endDate,
    clientCategoryId,
    logo,
  } = req.body;

  const client = await Client.findByPk(req.params.id);

  if (!client) {
    res.status(404);
    throw new Error("Client not found");
  }

  client.name = name || client.name;
  client.details = details || client.details;
  client.email = email || client.email;
  client.phone = phone || client.phone;
  client.location = location || client.location;
  client.priority = priority || client.priority;
  client.startDate = startDate || client.startDate;
  client.endDate = endDate || client.endDate;
  client.clientCategoryId = clientCategoryId || client.clientCategoryId;
  client.logo = logo || client.logo;

  await client.save();

  res.json(client);
});

const deleteClient = asyncHandler(async (req, res) => {
  const client = await Client.findByPk(req.params.id);

  if (!client) {
    res.status(404);
    throw new Error("Client not found");
  }

  await client.destroy();

  res.json({ message: "Client removed" });
});

const fetchCategories = asyncHandler(async (req, res) => {
  const categories = await ClientCategory.findAll();

  res.json(categories);
});

const addCategories = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const category = await ClientCategory.create({ name });

  res.status(201).json(category);
});

const updateCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const category = await ClientCategory.findByPk(req.params.id);

  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }

  category.name = name || category.name;

  await category.save();

  res.json(category);
});

const deleteCategory = asyncHandler(async (req, res) => {
  const category = await ClientCategory.findByPk(req.params.id);

  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }

  await category.destroy();

  res.json({ message: "Category removed" });
});

export {
  fetchClients,
  fetchClientById,
  addClient,
  updateClient,
  deleteClient,
  fetchCategories,
  addCategories,
  updateCategory,
  deleteCategory,
};
