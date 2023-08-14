const express = require("express");
const router = express.Router();

const productController = require("../controllers/product.controller");
const { getAllProduct, getBySlug, getByCategory, getByType, addProduct } =
  productController;
router.get("/", getAllProduct);
router.get("/category", getByCategory);
router.get("/type", getByType);
router.get("/:slug", getBySlug);
router.put("/", addProduct);
module.exports = router;
