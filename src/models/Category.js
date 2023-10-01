const db = require("../db");

const Category = {
  getAll: (callback) => {
    db.query("SELECT * FROM category", callback);
  },

  getBySlug: (slug, callback) => {
    db.query(`SELECT * FROM products WHERE idCategory='${slug}'`, callback);
  },
};

module.exports = Category;
