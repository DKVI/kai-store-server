const express = require("express");
const router = express.Router();

const productController = require("../controllers/product.controller");
const {
  getAllProduct,
  getBySlug,
  getByCategory,
  getByType,
  addProduct,
  searchProduct,
  getLimitProduct,
} = productController;
router.get("/category", getByCategory);
router.get("/type", getByType);
router.get("/search", searchProduct);
router.get("/limits/:limits", getLimitProduct);
router.get("/:slug", getBySlug);
router.put("/", addProduct);
router.get("/", getAllProduct);
module.exports = router;
