var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
var handlebars = require("express-handlebars");
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
var PORT = process.env.PORT || 3000;
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
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/newfeed", newfeedRouter);
app.use("/admin", adminRouter);
app.listen(PORT, function () {
  console.log(`Server started at port ${PORT}`);
});
