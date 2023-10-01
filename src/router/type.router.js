const router = require("express").Router();
const typeController = require("../controllers/type.controller");
const { getAllType, getBySlug } = typeController;
router.get("/", getAllType);
router.get("/:slug", getBySlug);

module.exports = router;
