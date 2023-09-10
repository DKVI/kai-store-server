const Cart = require("../models/Cart");

const getAllCartByIdUser = (req, res) => {
  const id = req.decoded.id ? req.decoded.id : req.params.id;
  Cart.getByIdUser(id, (err, result) => {
    if (err) {
      res.status(500).json({ message: "Internal Server Error" });
    } else {
      const dataCart = [];
      result.forEach((data) => {
        if (!data.idPayment) {
          dataCart.push(data);
        }
      });
      res.status(200).json({
        data: dataCart,
      });
    }
  });
};

const addCart = (req, res) => {
  const { id, idProduct, totalPrice, size, idUser, count } = req.body;
  const idPayment = null;
  const cart = { id, idProduct, totalPrice, size, idUser, count, idPayment };
  Cart.add(cart, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    } else {
      res.status(200).json({
        message: "Add Cart Success",
        data: cart,
      });
    }
  });
};

const deletedCart = (req, res) => {
  const id = req.params.id;
  Cart.deleteById(id, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    } else {
      res.status(200).json({
        message: "Delete Cart Success",
      });
    }
  });
};

const updateCart = (req, res) => {
  const id = req.params.id;
  let { idProduct, totalPrice, size, idUser, count, idPayment } = req.body;
  if (idPayment === "") {
    idPayment = null;
  }
  const cart = { id, idProduct, totalPrice, size, idUser, count, idPayment };
  Cart.update(cart, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    } else {
      res.status(200).json({
        message: "Update Cart Success",
        data: cart,
      });
    }
  });
};

const getById = (req, res) => {
  const id = req.params.id;
  Cart.getById(id, (err, result) => {
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
  getAllCartByIdUser,
  addCart,
  deletedCart,
  updateCart,
  getById,
};
