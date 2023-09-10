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
} = userController;
router.get("/", getAllUser);
router.put("/", createUser);
router.put("/login", loginUser);
router.patch("/:id", updateUser);
router.delete("/:id", deteleById);
router.get("/authentication", authenticationUser, (req, res) => {
  res.json({
    success: 1,
    message: "Access granted! Authorized user",
    data: req.decoded,
  });
});

module.exports = router;
