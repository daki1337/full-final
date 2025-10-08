const express = require("express");
const { paginate } = require("../middlewares/pagination.mw");
const { filterOrders } = require("../middlewares/filter.mw");
const { validate } = require("../middlewares/validate.mw");
const { 
  auth, 
  isAdmin, 
  canUpdateOrderStatus 
} = require("../middlewares/auth.mw");
const { 
  createOrderSchema, 
  updateStatusOrderSchema 
} = require("../validators/order.validator");
const { 
  createOrder, 
  getAllOrders, 
  getAccountOrders, 
  getOrder, 
  updateStatusOrder, 
  createCheckoutSession 
} = require("../controllers/order.controller");

const router = express.Router();

router.post("/", auth, validate(createOrderSchema), createOrder);
router.post("/create-checkout-session", createCheckoutSession);
router.get("/account", auth, paginate, getAccountOrders);
router.get("/", auth, isAdmin, paginate, filterOrders, getAllOrders);
router.get("/:orderId", auth, getOrder);
router.patch(
  "/:orderId",
  auth,
  canUpdateOrderStatus,
  validate(updateStatusOrderSchema),
  updateStatusOrder
);

module.exports = router;
