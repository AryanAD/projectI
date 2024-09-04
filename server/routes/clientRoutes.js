import express from "express";
import {
  fetchClients,
  fetchClientById,
  addClient,
  updateClient,
  deleteClient,
} from "../controllers/clientController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

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
