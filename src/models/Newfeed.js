const db = require("../db");

const Newfeed = {
  getAll: (callback) => {
    db.query("SELECT * FROM newfeed", callback);
  },
};

module.exports = Newfeed;
