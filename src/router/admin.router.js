const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");
const { loginAdmin, isLogin } = adminController;
const imageController = require("../controllers/images.controller");
const upload = require("../../multerConfig");
const productController = require("../controllers/product.controller");
const usersController = require("../controllers/user.controller");
const paymentController = require("../controllers/payment.controller");
const Payment = require("../models/Payment");
const previousRouter = [];
router.get("/login", (req, res) => {
  if (req.query.isLogin === "false") {
    res.render("login", {
      message: "Username or password is incorrect!",
    });
    return;
  }
  console.log(req.query.status);
  if (req.query.status === "logout") {
    res.render("login", {
      message: "You have been logout, login to continue!",
    });
    return;
  }
  res.render("login");
});

router.get("/login?status=logout", (req, res) => {
  res.render("login", {
    err: {
      message: "You have been logout!",
    },
  });
});
router.post("/login", loginAdmin, (req, res) => {
  res.redirect("/admin/products");
});

router.get("/products/create", isLogin, (req, res) => {
  res.render("createProducts");
});

router.get("/users/create", isLogin, (req, res) => {
  res.render("createUser");
});

router.get(
  "/products/:id?edit=info",
  adminController.isLogin,
  productController.getById
);

router.get(
  "/products",
  adminController.isLogin,
  (req, res, next) => {
    req.render = "true";
    next();
  },
  productController.getAllProduct
);

router.put("/imgs/edit/:id", imageController.updateImg);
router.put("/products/:id", isLogin, productController.updateProduct);
router.get(
  "/products/:id",
  (req, res, next) => {
    console.log(req.params.id);
    req.render = "true";
    next();
  },
  adminController.isLogin,
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

router.get("/users", isLogin, usersController.getAllUser);
router.post("/users", usersController.createUser);
router.get("/users/:id", isLogin, usersController.getUserById);
router.put("/users/:id", usersController.updateUser);
router.get("/users/:id?action=update", (req, res) => res.render("editUser"));
router.delete("/users/:id", usersController.deleteUser);
router.get("/payments", isLogin, paymentController.getAllPayment);
router.get("/payments/:id", isLogin, paymentController.getByIdPayment);
router.delete("/payments/:id", paymentController.deleteByIdPayment);
module.exports = router;
