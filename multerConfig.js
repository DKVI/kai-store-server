const express = require("express");
const multer = require("multer");
const app = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/imgs/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;