import express from "express";
import formiddable from "express-formidable";
const router = express.Router();

import {
  fetchProducts,
  fetchProductById,
  fetchAllProducts,
  addProduct,
  updateProductDetails,
  deleteProduct,
  addProductReviews,
  fetchTopProduct,
  fetchNewProducts,
  filteredProducts,
} from "../controllers/productController.js";

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware";
import checkId from "../middlewares/checkId.js";

router
  .route("/")
  .get(fetchProducts)
  .post(authenticate, authorizeAdmin, formiddable(), addProduct);
router.route("/all-products").get(fetchAllProducts);
router.route("/:id/reviews").post(authenticate, checkId, addProductReviews);
router.get("/top", fetchTopProduct);
router.get("/new", fetchNewProducts);
router
  .route("/:id")
  .get(fetchProductById)
  .put(authenticate, authorizeAdmin, formiddable(), updateProductDetails)
  .delete(authenticate, authorizeAdmin, deleteProduct);

router.route("/filtered-products").post(filteredProducts);

export default router;
