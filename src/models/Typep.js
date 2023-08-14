const db = require("../db");

const Typep = {
  getAll: (callback) => {
    db.query("SELECT * FROM typep", callback);
  },
};

module.exports = Typep;
