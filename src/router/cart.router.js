const router = require("express").Router();
const cartController = require("../controllers/cart.controller");
const { getAllCartByIdUser, addCart, deletedCart, updateCart, getById } =
  cartController;
const { authenticationUser } = require("../controllers/user.controller");
router.get("/allCart/:id", getAllCartByIdUser);
router.get("/myCart", getAllCartByIdUser);
router.post("/addCart", addCart);
router.get("/:id", getById);
router.delete("/deleteCart/:id", deletedCart);
router.put("/updateCart/:id", updateCart);

module.exports = router;
