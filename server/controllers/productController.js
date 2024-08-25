import asyncHandler from "../middlewares/asyncHandler";
import Product from "../models/productModel.js";

const fetchProducts = asyncHandler(async (req, res) => {
  try {
    const pageSize = 6;
    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword } }
      : {};
    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword }).limit(pageSize);
    res.json({
      products,
      page: 1,
      pages: Math.ceil(count / pageSize),
      hasMore: false,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const fetchProductById = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      throw new Error("Product not found");
    }
  } catch (error) {
    res.status(404).json({ error: "Product Not Found" });
  }
});

export {
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
};
