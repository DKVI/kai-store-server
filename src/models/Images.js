const express = require("express");
const db = require("../db");

const Images = {
  getAll: (callback) => {
    db.query("SELECT * FROM image", callback);
  },
  getById: (id, callback) => {
    db.query(`SELECT * FROM image WHERE idProduct = '${id}'`, callback);
  },
  add: (image, callback) => {
    const { idProduct, linkImg } = image;
    db.query(
      `INSERT INTO image (idProduct, linkImg) VALUES ('${idProduct}', '${linkImg}')`,
      callback
    );
  },
  deleteById: (id, callback) => {
    db.query(`DELETE FROM image WHERE idImg = '${id}'`, callback);
  },
  updateById: (image, callback) => {
    console.log(image);
    db.query(
      `UPDATE image SET linkImg = '${image.linkImg}' WHERE idImg = ${parseInt(
        image.idImg
      )}`,
      callback
    );
  },
  deleteByIdProduct: (id, callback) => {
    db.query(`DELETE FROM image WHERE idProduct = '${id}'`, callback);
  }
};

module.exports = Images;
