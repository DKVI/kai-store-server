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
  console.log (
    "req.body: ", req.body, "\n",
    "req.params: ", req.params.id 
  )
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

module.exports = { addImage, getImgByIdProduct, updateImg };
