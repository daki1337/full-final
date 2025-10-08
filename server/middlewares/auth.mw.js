const CONSTANTS = require("../constants");
const User = require("../models/User");
const Order = require("../models/Order");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");

module.exports.isOwner = async (req, res, next) => {
  if (req.params.idUser === req.user._id.toString()) {
    return next();
  }
  next(createError(403, "Only for owners"));
};

module.exports.isAdmin = async (req, res, next) => {
  if (req.user?.role === "admin") {
    return next();
  }
  next(createError(403, "Only for admins"));
};
module.exports.canUpdateOrderStatus = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return next(createError(404, "Order not found"));
    }
    if (
      req.user?.role === "admin" ||
      req.user?._id.toString() === order?.user.toString()
    ) {
      return next();
    }
    next(createError(403, "Access denied"));
  } catch (error) {
    next(error);
  }
};
module.exports.auth = async (req, res, next) => {
  try {
    const rowAuthorization = req.headers.authorization;
    const token = rowAuthorization?.replace("Bearer", "").trim();
    if (!token) {
      return next(createError(401, "Token required"));
    }
    const decoded = jwt.verify(token, CONSTANTS.JWT_SECRET);
    const user = await User.findById(decoded?.id);
    if (!user) {
      return next(createError(401, "Invalid token"));
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("auth error --->>>", error);
    next(createError(401, "Unautorized"));
  }
};
