import asyncHandler from "../middlewares/asyncHandler.js";
import Client from "../models/clientModel.js";
import ClientCategory from "../models/clientCategoryModel.js";

// Fetch all clients with associated category name
const fetchClients = asyncHandler(async (req, res) => {
  const clients = await Client.findAll({
    include: [
      {
        model: ClientCategory,
        as: "category",
        attributes: ["name"], // Include only the category name
      },
    ],
  });

  res.json(clients);
});

// Fetch client by ID with associated category name
const fetchClientById = asyncHandler(async (req, res) => {
  const client = await Client.findByPk(req.params.id, {
    include: [
      {
        model: ClientCategory,
        as: "category",
        attributes: ["name"], // Include only the category name
      },
    ],
  });

  if (!client) {
    res.status(404);
    throw new Error("Client not found");
  }

  res.json(client);
});

// Add a new client
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
    clientCategoryId, // Associate with the client category
    logo,
  });

  res.status(201).json(client);
});

// Update an existing client
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
  client.clientCategoryId = clientCategoryId || client.clientCategoryId; // Update the category
  client.logo = logo || client.logo;

  await client.save();

  res.json(client);
});

// Delete a client
const deleteClient = asyncHandler(async (req, res) => {
  const client = await Client.findByPk(req.params.id);

  if (!client) {
    res.status(404);
    throw new Error("Client not found");
  }

  await client.destroy();

  res.json({ message: "Client removed" });
});

export { fetchClients, fetchClientById, addClient, updateClient, deleteClient };
