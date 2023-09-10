const Payment = require("../models/Payment");
const Cart = require("../models/Cart");
const Product = require("../models/Products");

const getAllPayment = (req, res) => {
  const mode = req.query.mode;
  Payment.getAll((err, data) => {
    if (err) {
      res.status(500).json({
        success: 0,
        err,
      });
    }
    if (mode === "admin") {
      res.render("payment", {
        payments: { ...data },
      });
      return;
    } else {
      res.status(200).json({
        success: 1,
        data,
      });
    }
  });
};

const getByIdPayment = async (req, res) => {
  const mode = req.query.mode;
  const id = req.params.id;
  let total = 0;
  const payment = await new Promise((resolve, reject) => {
    Payment.getById(id, (err, data) => {
      if (err) {
        reject({
          success: 0,
          err,
        });
      } else {
        resolve(data);
      }
    });
  })
    .then((data) => data[0])
    .catch((err) => {
      console.log(err);
    });
  console.log(payment);
  const convertFeatureGH = JSON.parse(payment.featureGH);
  payment.featureGH = convertFeatureGH;
  console.log(payment);
  const cartArray = [];
  for (let i = 0; i < payment.featureGH.length; i++) {
    const cart = await new Promise((resolve, reject) => {
      Cart.getById(payment.featureGH[i], (err, data) => {
        if (err) {
          reject({
            success: 0,
            err,
          });
        } else {
          resolve(data);
        }
      });
    })
      .then((data) => data[0])
      .catch((err) => {
        console.log(err);
      });
    total += parseFloat(cart.totalPrice);
    console.log(total);
    cartArray.push(cart);
  }

  if (mode === "admin") {
    res.render("paymentDetail", {
      data: {
        ...payment,
        carts: cartArray,
      },
    });
    return;
  }

  res.send({
    total,
    ...payment,
    carts: cartArray,
  });
};

const deleteByIdPayment = async (req, res) => {
  const id = req.params.id;
  const respone = await new Promise((resolve, reject) => {
    Payment.deleteById(id, (err, data) => {
      if (err) {
        reject({
          success: 0,
          err,
        });
      } else {
        resolve({
          success: 1,
          data,
        });
      }
    });
  })
    .catch((err) => {
      console.log(err);
    })
    .then((data) => data);
  res.send(respone);
};

const getByIdUser = async (req, res) => {
  const id = req.decoded.id ? req.decoded.id : req.params.id;
  const payment = await new Promise((resolve, reject) => {
    Payment.getByIdUser(id, (err, data) => {
      if (err) {
        reject({
          success: 0,
          err,
        });
      } else {
        resolve(data);
      }
    });
  }).then((data) => {
    data.forEach((item) => {
      item.featureGH = JSON.parse(item.featureGH);
    });
    return data;
  });
  const result = payment.map( (item) => {
    const cartArray = item.featureGH.map( (item) => {
      return item;
    });
    return cartArray;
  });
  console.log(result);
};

module.exports = {
  getAllPayment,
  getByIdPayment,
  deleteByIdPayment,
  getByIdUser,
};
