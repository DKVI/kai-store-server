const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
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
    const body = {
      id: admin[0].idAdmin,
      username: admin[0].username,
    };
    const token = jwt.sign({ user: body }, process.env.JWT_KEY, {
      expiresIn: "1h",
    });
    res.cookie("token", token, { maxAge: 3600000 });
    next();
  } else {
    res.redirect("/admin/login?isLogin=false");
  }
};

function isLogin(req, res, next) {
  console.log(req.cookies.token);
  try {
    const token = req.cookies.token;
    console.log(token);
    const decoded = jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        return res.redirect("/admin/login?status=logout");
      } else {
        return decoded;
      }
    });
    req.user = decoded;
    next();
  } catch (err) {
    res.redirect("/admin/login?status=logout");
  }
}

module.exports = { loginAdmin, isLogin };
