const db = require("../db");

const Category = {
  getAll: (callback) => {
    db.query("SELECT * FROM category", callback);
  },
};

module.exports = Category;
