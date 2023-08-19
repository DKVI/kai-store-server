const db = require("../db");

const Payment = {
  getById: (id, callback) => {
    db.query(`SELECT * FROM payment WHERE idPayment = "${id}"`, callback);
  },
  getAll: (callback) => {
    db.query(`SELECT * FROM payment`, callback);
  },
  deleteById: (id, callback) => {
    db.query(`DELETE FROM payment WHERE idPayment = "${id}"`, callback);
  },
};

module.exports = Payment;
