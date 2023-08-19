const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");
const { loginAdmin } = adminController;
const imageController = require("../controllers/images.controller");
const upload = require("../../multerConfig");
const productController = require("../controllers/product.controller");
const usersController = require("../controllers/user.controller");
const paymentController = require("../controllers/payment.controller");
const Payment = require("../models/Payment");
router.get("/login", (req, res) => {
  res.render("login");
});
router.post("/login", loginAdmin, (req, res) => {
  res.redirect("/admin/products");
});

router.get("/products/create", (req, res) => {
  res.render("createProducts");
});

router.get("/users/create", (req, res) => {
  res.render("createUser");
});

router.get(
  "/products",
  (req, res, next) => {
    req.render = "true";
    next();
  },
  productController.getAllProduct
);

router.get("/products/:id?edit=info", productController.getById);
router.put("/imgs/edit/:id", imageController.updateImg);
router.put("/products/:id", productController.updateProduct);
router.get(
  "/products/:id",
  (req, res, next) => {
    console.log(req.params.id);
    req.render = "true";
    next();
  },
  productController.getById
);

router.post(
  "/upload/multipleFile",
  upload.array("img", 4),
  (req, res, next) => {
    let filesPath = req.files.map((file) => file.path);
    filesPath = filesPath.map((path) => path.replace(/\\/g, "/"));
    filesPath = filesPath.map((path) => path.replace("public", ""));
    res.json({ filesPath: filesPath });
  }
);

router.post("/create/imgs", imageController.addImage);
router.post("/create/products", productController.addProduct);
router.delete("/delete/products/:id", productController.deleteById);
router.delete(
  "/delete/imgs-from-product/:id",
  imageController.deleteByIdProduct
);

router.get("/users", usersController.getAllUser);
router.post("/users", usersController.createUser);
router.get("/users/:id", usersController.getUserById);
router.put("/users/:id", usersController.updateUser);
router.get("/users/:id?action=update", (req, res) => res.render("editUser"));
router.delete("/users/:id", usersController.deleteUser);
router.get("/payments", paymentController.getAllPayment);
router.get("/payments/:id", paymentController.getByIdPayment);
router.delete("/payments/:id", paymentController.deleteByIdPayment);
module.exports = router;
