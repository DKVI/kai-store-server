const Images = require("../models/Images");

const addImage = async (req, res) => {
  const { idProduct, linkImg } = req.body;
  const image = {
    idProduct,
    linkImg,
  };
  const result = await new Promise((resolve, reject) => {
    Images.add(image, (err, data) => {
      if (err) {
        reject({
          success: 0,
          message: "Database connection error",
        });
      } else {
        resolve({
          success: 1,
          message: "Add image successfully",
        });
      }
    });
  }).then((data) => data);
  res.status(200).json(result);
};

const getImgByIdProduct = async (req, res) => {
  const idProduct = req.params.id;
  console.log(idProduct);
  const images = await new Promise((resolve, reject) => {
    Images.getById(idProduct, (err, data) => {
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
  res.render("editImgs", { images: images });
};

const updateImg = async (req, res) => {
  const idImg = req.params.id;
  req.body.idImg = idImg;
  Images.updateById(req.body, (err, data) => {
    console.log(req.body);
    if (err) {
      res.status(500).json({
        success: 0,
        message: "Database connection error",
      });
    } else {
      res.status(200).json({
        success: 1,
        message: "Update image successfully",
      });
    }
  });
};

const deleteByIdProduct = (req, res) => {
  const idProduct = req.params.id;
  Images.deleteByIdProduct(idProduct, (err, data) => {
    if (err) {
      res.status(500).json({
        success: 0,
        message: "Database connection error",
      });
    } else {
      res.status(200).json({
        success: 1,
        message: `Delete all image of product ${idProduct} successfully`,
      });
    }
  });
};

const deleteById = (req, res) => {
  const id = req.params.id;
  Images.deleteById(id, (err, data) => {
    if (err) {
      res.status(500).json({
        success: 0,
        message: "Database connect error",
      });
    } else {
      res.status(200).json({
        success: 0,
        message: "Delete image sucessfully",
      });
    }
  });
};

module.exports = {
  addImage,
  getImgByIdProduct,
  updateImg,
  deleteByIdProduct,
  deleteById,
};
