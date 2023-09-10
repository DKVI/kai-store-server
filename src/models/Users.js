const db = require("../db");

const User = {
  getAll: (callback) => {
    db.query("SELECT * FROM users", callback);
  },
  create: (newUser, callback) => {
    const {
      idUser,
      nameUser,
      username,
      password,
      address,
      email,
      phoneNumber,
    } = newUser;
    db.query(
      `INSERT INTO users (idUser, nameUser, username, password,address,email, phoneNumber) VALUES ('${idUser}', '${nameUser}', '${username}', '${password}', '${address}', '${email}', '${phoneNumber}')`,
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

  getById: (id, callback) => {
    db.query(`SELECT * FROM users WHERE idUser = '${id}'`, callback);
  },

  login: (user, callback) => {
    const { username, password } = user;
    console.log(username, password);
    db.query(
      `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`,
      callback
    );
  },
};

module.exports = User;
