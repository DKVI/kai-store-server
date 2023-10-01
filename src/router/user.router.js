const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const {
  getAllUser,
  createUser,
  updateUser,
  deteleById,
  loginUser,
  authenticationUser,
  getUserById,
} = userController;
router.get("/:id", getUserById);
router.get("/", getAllUser);
router.put("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deteleById);
router.put("/login", loginUser);
router.get("/authentication", authenticationUser, (req, res) => {
  res.json({
    success: 1,
    message: "Access granted! Authorized user",
    data: req.decoded,
  });
});

module.exports = router;
