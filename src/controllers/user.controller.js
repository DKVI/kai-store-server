const User = require("../models/Users");

const getAllUser = async (req, res) => {
  const users = await new Promise((resolve, reject) => {
    User.getAll((err, data) => {
      if (err) {
        reject({
          success: 0,
          message: "Database connection error",
        });
      } else {
        resolve([...data]);
      }
    });
  }).then((data) => {
    return data;
  });
  res.render("users", { users });
};

const createUser = async (req, res) => {
  const newUser = req.body;
  console.log(req.body);
  const user = await new Promise((resolve, reject) => {
    User.create(newUser, (err, data) => {
      if (err) {
        reject({
          success: 0,
          err: err,
          message: "Database connection error",
        });
      } else {
        resolve(data);
      }
    });
  })
    .then((data) => data)
    .catch((err) => {
      console.log(err);
    });
  res.status(200).json({
    success: 1,
    data: user,
    message: "Create user successfully",
  });
};

const updateUser = (req, res) => {
  const id = req.params.id;
  const body = req.body;
  User.update(id, body, (err, data) => {
    if (err) {
      res.status(500).json({
        success: 0,
        err: err,
        message: "server error!",
      });
    } else {
      res.status(200).json({
        success: 1,
        message: "update user successfully!",
      });
    }
  });
};

const deteleById = (req, res) => {
  const id = req.params.id;
  User.delete(id, (err, data) => {
    if (err) {
      res.status(500).json({
        success: 0,
        err: err,
        message: "server error!",
      });
    } else {
      res.status(200).json({
        success: 1,
        message: "delete user successfully!",
      });
    }
  });
};

function getUserById(req, res) {
  const id = req.params.id;
  const action = req.query.action;
  console.log(id);
  User.getById(id, (err, data) => {
    if (err) {
      res.status(500).json({
        success: 0,
        err: err,
        message: "server error!",
      });
    }
    if (action === "update") {
      res.render("editUser", { user: data[0] });
    } else {
      res.status(200).json({
        success: 1,
        data: data[0],
        message: "get user successfully!",
      });
    }
  });
}

const deleteUser = (req, res) => {
  const id = req.params.id;
  User.delete(id, (err, data) => {
    if (err) {
      res.status(500).json({
        success: 0,
        err: err,
        message: "server error!",
      });
    } else {
      res.status(200).json({
        success: 1,
        message: "delete user successfully!",
      });
    }
  });
};

module.exports = {
  getAllUser,
  createUser,
  updateUser,
  deteleById,
  getUserById,
  deleteUser,
};
