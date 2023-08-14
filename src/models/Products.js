const db = require("../db");

const Product = {
  getAll: (callback) => {
    db.query(
      "SELECT DISTINCT * FROM products, typep, category WHERE products.idType = typep.idType AND products.idCategory = category.idCategory",
      callback
    );
  },
  create: (newProduct, callback) => {
    const {
      idProduct,
      nameProduct,
      idCategory,
      idType,
      slug,
      des,
      featureSize,
      featureColor,
      otherFeature,
      price,
    } = newProduct;
    db.query(
      `INSERT INTO products (idProduct, nameProduct, idCategory, idType, pSlug, des, featureSize, featureColor, otherFeature, price) VALUES ('${idProduct}', '${nameProduct}', '${idCategory}', '${idType}', '${slug}', '${des}', '${featureSize}', '${featureColor}', '${otherFeature}', '${price}')`,
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
};

module.exports = Product;
