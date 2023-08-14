const db = require("../db");

const User = {
  getAll: (callback) => {
    db.query("SELECT * FROM users", callback);
  },
  create: (newUser, callback) => {
    const { idUser, nameUser, username, password, address, email } = newUser;
    db.query(
      `INSERT INTO users (idUser, nameUser, username, password,address,email) VALUES ('${idUser}', '${nameUser}', '${username}', '${password}', '${address}', '${email}')`,
      callback
    );
  },

  update: (id, updateBody, callback) => {
    const { nameUser, username, password, address, email } = updateBody;
    db.query(
      `UPDATE users SET nameUser='${nameUser}', username='${username}', password='${password}', address='${address}', email='${email}'  WHERE idUser = '${id}'`,
      callback
    );
  },
  delete: (id, callback) => {
    db.query(`DELETE FROM users WHERE idUser = '${id}'`, callback);
  },
};

module.exports = User;
