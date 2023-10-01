const Category = require("../models/Category");

const getAllCategory = (req, res) => {
  Category.getAll((err, result) => {
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
  Category.getBySlug(slug, (err, result) => {
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
  getAllCategory,
  getBySlug,
};
