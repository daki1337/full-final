const express = require("express");
const { auth, isAdmin } = require("../middlewares/auth.mw");
const { getStats } = require("../controllers/admin.controller");
const router = express.Router();

router.get("/stats", auth, isAdmin, getStats);

module.exports = router;
