const db = require("../db");

const Typep = {
  getAll: (callback) => {
    db.query("SELECT * FROM typep", callback);
  },
  getBySlug: (slug, callback) => {
    console.log(slug);
    db.query(`SELECT * FROM products WHERE idType='${slug}'`, callback);
  },
};

module.exports = Typep;
