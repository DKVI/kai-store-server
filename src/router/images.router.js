const router = require("express").Router();
const imagesController = require("../controllers/images.controller");
const {
  addImage,
  getImgByIdProduct,
  updateImg,
  deleteByIdProduct,
  deleteById,
} = imagesController;

router.post("/", addImage);
router.get("/:id", getImgByIdProduct);
router.put("/:id", updateImg);
router.delete("/:id", deleteById);
router.delete("/delete-by-id-product/:id", deleteByIdProduct);

module.exports = router;
