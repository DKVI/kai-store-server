const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { getAllUser, createUser, updateUser, deteleById } = userController;
router.get("/", getAllUser);
router.put("/", createUser);
router.patch("/:id", updateUser);
router.delete("/:id", deteleById);

module.exports = router;
