const Admin = require("../models/Admin");
const loginAdmin = async (req, res, next) => {
  const { username, password } = req.body;
  const admin = await new Promise((resolve, reject) => {
    Admin.login(username, password, (err, data) => {
      if (err) {
        reject({
          success: 0,
          err,
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
  if (admin.length > 0) {
    next();
  } else {
    res.status(200).json({
      success: 0,
      message: "Invalid username or password",
    });
  }
};

module.exports = { loginAdmin };
