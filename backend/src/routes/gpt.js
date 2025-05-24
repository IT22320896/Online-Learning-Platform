const express = require("express");
const router = express.Router();
const {
  getCourseRecommendations,
  getApiUsageStats,
} = require("../controllers/gpt");
const { authenticateUser, authorizeRoles } = require("../middleware/auth");

// Protected routes
router.post("/recommendations", authenticateUser, getCourseRecommendations);

// Admin routes
router.get(
  "/stats",
  authenticateUser,
  authorizeRoles("admin"),
  getApiUsageStats
);

module.exports = router;
