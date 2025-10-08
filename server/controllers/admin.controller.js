const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");

module.exports.getStats = async (req, res, next) => {
  try {
    const [users, orders, products] = await Promise.all([
      User.countDocuments(),
      Order.countDocuments(),
      Product.countDocuments(),
    ]);
    
    res.status(200).send({ data: { users, orders, products } });
  } catch (error) {
    next(error);
  }
};
