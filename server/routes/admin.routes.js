const express = require("express");
const router = express.Router();
const { auth, isAdmin } = require("../middlewares/auth.mw");
const { getStats } = require("../controllers/admin.controller");
router.get("/stats", auth, isAdmin, getStats);
module.exports = router;
