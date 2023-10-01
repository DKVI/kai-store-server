const router = require("express").Router();
const categoryController = require("../controllers/category.controller");
const { getAllCategory, getBySlug } = categoryController;
router.get("/", getAllCategory);
router.get("/:slug", getBySlug);

module.exports = router;
