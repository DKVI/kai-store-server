const Typep = require("../models/Typep");

const getAllType = (req, res) => {
  Typep.getAll((err, result) => {
    if (err) {
      res.status(500).json({ message: "Internal Server Error" });
    } else {
      res.status(200).json({
        data: result,
      });
    }
  });
};

const getBySlug = (req, res) => {
  const slug = req.params.slug;
  Typep.getBySlug(slug, (err, result) => {
    if (err) {
      res.status(500).json({ message: "Internal Server Error" });
    } else {
      res.status(200).json({
        data: result,
      });
    }
  });
};

module.exports = {
  getAllType,
  getBySlug,
};
