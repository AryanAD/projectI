// import express from "express";

// import {
//   createOrder,
//   getAllOrders,
//   getUserOrders,
//   countTotalOrders,
//   countTotalSales,
//   calculateTotalSalesByDate,
//   findOrderById,
//   markOrderAsPaid,
//   markOrderAsDelivered,
// } from "../controllers/orderController.js";
// import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

// const router = express.Router();

// router
//   .route("/")
//   .post(authenticate, createOrder)
//   .get(authenticate, authorizeAdmin, getAllOrders);

// router.route("/user-order").get(authenticate, getUserOrders);
// router.route("/total-orders").get(countTotalOrders);
// router.route("/total-sales").get(countTotalSales);
// router.route("/total-sales-by-date").post(calculateTotalSalesByDate);
// router.route("/:id").get(authenticate, findOrderById);
// router.route("/:id/pay").put(authenticate, markOrderAsPaid);
// router
//   .route("/:id/deliver")
//   .put(authenticate, authorizeAdmin, markOrderAsDelivered);

// export default router;
