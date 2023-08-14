const express = require("express");
const Products = require("../models/Products");
const Images = require("../models/Images");

function addImgsAndNomalize(product, images) {
  const imgs = images.filter((image) => image.idProduct === product.idProduct);
  product.featureSize = JSON.parse(product.featureSize);
  product.featureColor = JSON.parse(product.featureColor);
  product.otherFeature = JSON.parse(product.otherFeature);
  return imgs;
}

async function getAllProduct(req, res) {
  console.log(req.render);
  const products = await new Promise((resolve, reject) => {
    Products.getAll((err, data) => {
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
  const images = await new Promise((resolve, reject) => {
    Images.getAll((err, data) => {
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
  const data = products.map((product) => {
    const imgs = addImgsAndNomalize(product, images);
    return {
      ...product,
      images: imgs,
      thumbnail: imgs[0].linkImg,
    };
  });

  if (req.render) {
    res.render("products", { data });
  } else {
    res.status(200).json({
      success: 1,
      data,
    });
  }
}

async function getById(req, res) {
  const edit = req.query.edit;
  console.log(edit);
  const product = await new Promise((resolve, reject) => {
    Products.getById(req.params.id, (err, data) => {
      if (err) {
        reject({
          success: 0,
          message: "Database connection error",
        });
      } else {
        resolve(data);
      }
    });
  }).then((data) => data);
  const imgs = await new Promise((resolve, reject) => {
    Images.getById(product[0].idProduct, (err, data) => {
      if (err) {
        reject({
          success: 0,
          message: "Database connection error",
        });
      } else {
        resolve(data);
      }
    });
  }).then((data) => data);
  const images = addImgsAndNomalize(product[0], imgs);
  const arrayLinkImg = images.map((image) => image.linkImg);
  if (edit) {
    if (edit === "info") {
      res.render("editInfo", { product: product[0] });
      return;
    }
    if (edit === "imgs") {
      res.render("editImgs", { id: req.params.id, images: imgs });
      return;
    }
  }
  if (req.render) {
    res.render("detail", {
      product: product[0],
      thumbnail: images[0].linkImg,
      images: arrayLinkImg,
    });
    return;
  } else {
    res.status(200).json({
      success: 1,
      data: {
        ...product[0],
        images,
        thumbnail: images[0].linkImg,
      },
    });
    return;
  }
}

async function getBySlug(req, res) {
  const product = await new Promise((resolve, reject) => {
    Products.getBySlug(req.params.slug, (err, data) => {
      if (err) {
        reject({
          success: 0,
          message: "Database connection error",
        });
      } else {
        resolve(data);
      }
    });
  }).then((data) => data);

  const imgs = await new Promise((resolve, reject) => {
    Images.getById(product[0].idProduct, (err, data) => {
      if (err) {
        reject({
          success: 0,
          message: "Database connection error",
        });
      } else {
        resolve(data);
      }
    });
  }).then((data) => data);
  const images = addImgsAndNomalize(product[0], imgs);
  const arrayLinkImg = images.map((image) => image.linkImg);
  if (req.render) {
    res.render("detail", {
      product: product[0],
      thumbnail: images[0].linkImg,
      images: arrayLinkImg,
    });
  } else {
    res.status(200).json({
      success: 1,
      data: {
        ...product[0],
        images,
        thumbnail: images[0].linkImg,
      },
    });
  }
}

const getByCategory = async (req, res) => {
  const products = await new Promise((resolve, reject) => {
    Products.getByCategory(req.query.show, (err, data) => {
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
  const images = await new Promise((resolve, reject) => {
    Images.getAll((err, data) => {
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
  const data = products.map((product) => {
    const imgs = addImgsAndNomalize(product, images);
    return {
      ...product,
      images: imgs,
    };
  });
  res.status(200).json({
    success: 1,
    data,
  });
};

const getByType = async (req, res) => {
  const products = await new Promise((resolve, reject) => {
    Products.getByType(req.query.show, (err, data) => {
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
  const images = await new Promise((resolve, reject) => {
    Images.getAll((err, data) => {
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
  const data = products.map((product) => {
    const imgs = addImgsAndNomalize(product, images);
    return {
      ...product,
      images: imgs,
      thumbnail: imgs[0].linkImg,
    };
  });
  res.status(200).json({
    success: 1,
    data,
  });
};

function addProduct(req, res) {
  const body = req.body;
  Products.create(body, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: 0,
        message: "Database connection error",
      });
    }
    return res.status(200).json({
      success: 1,
      data: results,
    });
  });
}

function updateProduct(req, res) {
  const body = req.body;
  const id = req.params.id;
  Products.update(id, body, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: 0,
        message: "Database connection error",
      });
    }
    return res.status(200).json({
      success: 1,
      data: results,
    });
  });
}

module.exports = {
  getAllProduct,
  getBySlug,
  getById,
  getByCategory,
  getByType,
  addProduct,
  updateProduct,
};
