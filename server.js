var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
var handlebars = require("express-handlebars");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const session = require("express-session");
app.use(cookieParser());
app.use(
  session({
    secret: "sceret-key",
    resave: false,
    saveUninitialized: false,
  })
);
const hbs = handlebars.create({
  helpers: {
    arrayIndex: function (array, index) {
      return array[index];
    },

    json: function (context) {
      return JSON.stringify(context);
    },

    objectArrayValue(object, index, key) {
      return object[index][key];
    },

    objectValue(object, key) {
      return object[key];
    },
  },
});
var PORT = process.env.PORT || 8080;
const engine = hbs.engine;
app.engine("handlebars", engine);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

require("dotenv").config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
console.log(__dirname);
app.use(express.static(path.join(__dirname, "public")));

const productRouter = require("./src/router/product.router");
const userRouter = require("./src/router/user.router");
const newfeedRouter = require("./src/router/newfeed.router");
const adminRouter = require("./src/router/admin.router");
const cartRouter = require("./src/router/cart.router");
const paymentRouter = require("./src/router/payment.router");
const categoryRouter = require("./src/router/category.router");
const typeRouter = require("./src/router/type.router");
const searchRouter = require("./src/router/search.router");
const imagesRouter = require("./src/router/images.router");
app.use("/api/v1/products", productRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/newfeed", newfeedRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/payment", paymentRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/type", typeRouter);
app.use("/api/v1/search", searchRouter);
app.use("/api/v1/images", imagesRouter);
app.use("/admin", adminRouter);
app.use("/cart", cartRouter);
app.use("/payment", paymentRouter);
app.listen(PORT, function () {
  console.log(`Server started at port ${PORT}`);
});
