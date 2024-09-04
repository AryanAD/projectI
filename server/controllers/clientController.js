import asyncHandler from "../middlewares/asyncHandler.js";
import Client from "../models/clientModel.js";

// Fetch all clients
const fetchClients = asyncHandler(async (req, res) => {
  const clients = await Client.findAll();
  res.json(clients);
});

// Fetch client by ID
const fetchClientById = asyncHandler(async (req, res) => {
  const client = await Client.findByPk(req.params.id);

  if (!client) {
    res.status(404);
    throw new Error("Client not found");
  }

  res.json(client);
});

// Add a new client
const addClient = asyncHandler(async (req, res) => {
  const { name, details, category, phone, address } = req.body;

  const client = await Client.create({
    name,
    details,
    category,
    phone,
    address,
  });

  res.status(201).json(client);
});

// Update an existing client
const updateClient = asyncHandler(async (req, res) => {
  const { name, details, category, phone, address } = req.body;

  const client = await Client.findByPk(req.params.id);

  if (!client) {
    res.status(404);
    throw new Error("Client not found");
  }

  client.name = name || client.name;
  client.details = details || client.details;
  client.category = category || client.category;
  client.phone = phone || client.phone;
  client.address = address || client.address;

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
