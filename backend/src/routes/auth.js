const express = require("express");
const router = express.Router();
const { register, login, getProfile } = require("../controllers/auth");
const { authenticateUser } = require("../middleware/auth");

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected routes
router.get("/profile", authenticateUser, getProfile);

module.exports = router;
