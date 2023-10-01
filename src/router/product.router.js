const express = require("express");
const router = express.Router();

const productController = require("../controllers/product.controller");
const {
  getAllProduct,
  updateProduct,
  getByCategory,
  getByType,
  addProduct,
  searchProduct,
  getLimitProduct,
  getById,
  deleteById,
} = productController;
const searchController = require("../controllers/search.controller");

const { getByOptions } = searchController;

router.get("/category", getByCategory);
router.get("/type", getByType);
router.get("/search", getByOptions);
router.get("/:id", getById);
router.get("/limits/:limits", getLimitProduct);
router.post("/", addProduct);
router.put("/:id", updateProduct);
router.get("/", getAllProduct);
router.delete("/delete/:id", deleteById);
module.exports = router;
