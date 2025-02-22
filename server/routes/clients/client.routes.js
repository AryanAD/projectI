import express from "express";
import {
  addClient,
  deleteClient,
  fetchClientById,
  fetchClients,
  updateClient,
} from "../../controllers/clients/client.controller.js";
import { admin, protect } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(protect, admin, fetchClients)
  .post(protect, admin, addClient);

router
  .route("/:id")
  .get(protect, admin, fetchClientById)
  .put(protect, admin, updateClient)
  .delete(protect, admin, deleteClient);

export default router;
