const router = require("express").Router();
const searchController = require("../controllers/search.controller");

const { getByOptions } = searchController;

router.get("/show", getByOptions);

module.exports = router;
