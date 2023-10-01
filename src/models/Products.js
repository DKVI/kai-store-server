const db = require("../db");

const Product = {
  getAll: (callback) => {
    db.query(
      "SELECT DISTINCT * FROM products, typep, category WHERE products.idType = typep.idType AND products.idCategory = category.idCategory",
      callback
    );
  },
  getLimit: (limits, callback) => {
    db.query(
      `SELECT DISTINCT * FROM products, typep, category WHERE products.idType = typep.idType AND products.idCategory = category.idCategory LIMIT ${limits}`,
      callback
    );
  },
  search: (key, callback) => {
    db.query(
      `SELECT DISTINCT * FROM products, typep, category WHERE products.idType = typep.idType AND products.idCategory = category.idCategory AND products.nameProduct LIKE '%${key}%'`,
      callback
    );
  },
  create: (newProduct, callback) => {
    const {
      idProduct,
      nameProduct,
      idCategory,
      idType,
      pSlug,
      des,
      featureSize,
      featureColor,
      otherFeature,
      price,
    } = newProduct;
    db.query(
      `INSERT INTO products (idProduct, nameProduct, idCategory, idType, pSlug, des, featureSize, featureColor, otherFeature, price) VALUES ('${idProduct}', '${nameProduct}', '${idCategory}', '${idType}', '${pSlug}', '${des}', '${featureSize}', '${featureColor}', '${otherFeature}', '${price}')`,
      callback
    );
  },
  getBySlug: (slug, callback) => {
    db.query(
      `SELECT DISTINCT * FROM products, typep, category WHERE products.idType = typep.idType AND products.idCategory = category.idCategory AND products.pSlug = '${slug}'`,
      callback
    );
  },

  getByCategory: (idCategory, callback) => {
    db.query(
      `SELECT DISTINCT * FROM products, typep, category WHERE products.idType = typep.idType AND products.idCategory = category.idCategory AND products.idCategory = '${idCategory}'`,
      callback
    );
  },
  getByType: (idType, callback) => {
    db.query(
      `SELECT DISTINCT * FROM products, typep, category WHERE products.idType = typep.idType AND products.idCategory = category.idCategory AND products.idType = '${idType}'`,
      callback
    );
  },

  getById: (idProduct, callback) => {
    db.query(
      `SELECT DISTINCT * FROM products, typep, category WHERE products.idType = typep.idType AND products.idCategory = category.idCategory AND products.idProduct = '${idProduct}'`,
      callback
    );
  },

  deleteById: (idProduct, callback) => {
    db.query(`DELETE FROM products WHERE idProduct = '${idProduct}'`, callback);
  },

  update: (idProduct, product, callback) => {
    const {
      nameProduct,
      idCategory,
      idType,
      pSlug,
      des,
      featureSize,
      featureColor,
      otherFeature,
      price,
    } = product;
    db.query(
      `UPDATE products SET nameProduct = '${nameProduct}', idCategory = '${idCategory}', idType = '${idType}', pSlug = '${pSlug}', des = '${des}', featureSize = '${featureSize}', featureColor = '${featureColor}', otherFeature = '${otherFeature}', price = '${price}' WHERE idProduct = '${idProduct}'`,
      callback
    );
  },

  getByOptions: (search, callback) => {
    const { keyword, options } = search;
    const baseQuery = `SELECT DISTINCT * FROM products, typep, category WHERE products.idType = typep.idType AND products.idCategory = category.idCategory`;

    switch (options) {
      case "new":
        db.query(
          `${baseQuery} AND products.otherFeature LIKE '%new%' AND products.nameProduct LIKE ?`,
          [`%${keyword}%`],
          callback
        );
        break;
      case "best-seller":
        db.query(
          `${baseQuery} AND products.otherFeature LIKE '%best-seller%' AND products.nameProduct LIKE ?`,
          [`%${keyword}%`],
          callback
        );
        break;
      case "priceASC":
        db.query(
          `${baseQuery} AND products.nameProduct LIKE ? ORDER BY price ASC`,
          [`%${keyword}%`],
          callback
        );
        break;
      case "priceDESC":
        db.query(
          `${baseQuery} AND products.nameProduct LIKE ? ORDER BY price DESC`,
          [`%${keyword}%`],
          callback
        );
        break;
      case "nameASC":
        db.query(
          `${baseQuery} AND products.nameProduct LIKE ? ORDER BY nameProduct ASC`,
          [`%${keyword}%`],
          callback
        );
        break;
      case "nameDESC":
        db.query(
          `${baseQuery} AND products.nameProduct LIKE ? ORDER BY nameProduct DESC`,
          [`%${keyword}%`],
          callback
        );
        break;
    }
  },
};

module.exports = Product;
