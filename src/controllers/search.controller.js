const Products = require("../models/Products");

async function getByOptions(req, res) {
  const keyword = req.query.keyword;
  const options = req.query.options;
  const search = { keyword, options };
  Products.getByOptions(search, (err, data) => {
    if (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
    res.status(200).json({
      data,
    });
  });
}

module.exports = {
  getByOptions,
};
