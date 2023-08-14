const express = require("express");
const router = express.Router();
const newfeedController = require("../controllers/newfeed.controller");

const { getHome } = newfeedController;
router.get("/", getHome);

module.exports = router;
