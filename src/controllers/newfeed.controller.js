const NewFeed = require("../models/NewFeed");
const Type = require("../models/Typep");
const Category = require("../models/Category");

async function getHome(req, res) {
  const newfeed = await new Promise((resolve, reject) => {
    NewFeed.getAll((err, data) => {
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

  const category = await new Promise((resolve, reject) => {
    Category.getAll((err, data) => {
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

  const typep = await new Promise((resolve, reject) => {
    Type.getAll((err, data) => {
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

  res.status(200).json({
    success: 0,
    newfeed,
    category,
    typep,
  });
}

module.exports = {
  getHome,
};
