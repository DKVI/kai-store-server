const router = require("express").Router();
const paymentController = require("../controllers/payment.controller");
const { authenticationUser } = require("../controllers/user.controller");
const { getByIdUser, getByIdPayment } = paymentController;
router.get("/myPayment", authenticationUser, getByIdUser);
router.get("/user/:id", getByIdUser);
router.get("/:id", getByIdPayment);
module.exports = router;
