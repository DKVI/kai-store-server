const db = require("../db");

const Cart = {
  getById: (id, callback) => {
    db.query(`SELECT * FROM cart WHERE idCart = "${id}"`, callback);
  },
  getAll: (callback) => {
    db.query(`SELECT * FROM cart`, callback);
  },
  add: (cart, callback) => {
    const { id, idProduct, totalPrice, size, idUser, count, idPayment } = cart;
    db.query(
      `INSERT INTO cart (idCart, idProduct, totalPrice, size, idUser, count, idPayment) VALUES ("${id}", "${idProduct}", ${totalPrice}, "${size}", "${idUser}", ${count}, "${idPayment}")`,
      callback
    );
  },
  update: (cart, callback) => {
    const { id, idProduct, totalPrice, size, idUser, count, idPayment } = cart;
    db.query(
      `UPDATE cart SET idProduct = "${idProduct}", totalPrice = ${totalPrice}, size = "${size}", idUser = "${idUser}", count = ${count}, idPayment = "${idPayment}" WHERE idCart = "${id}"`,
      callback
    );
  },
  deleteById: (id, callback) => {
    db.query(`DELETE FROM cart WHERE idCart = ${id}`, callback);
  },
};

module.exports = Cart;
