const express = require("express");
const router = express.Router();
const { authenticateUser, authorizeRoles } = require("../middleware/auth");
const User = require("../models/User");
const config = require("../config/config");

/**
 * Get enrolled courses for current user
 * @route GET /api/users/courses
 * @access Private
 */
router.get("/courses", authenticateUser, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate(
      "enrolledCourses",
      "title description category level thumbnail"
    );

    res.status(200).json({
      success: true,
      count: user.enrolledCourses.length,
      data: user.enrolledCourses,
    });
  } catch (error) {
    console.error("Get enrolled courses error:", error);
    res.status(500).json({
      message: "Server error while fetching enrolled courses",
      error: config.nodeEnv === "development" ? error.message : undefined,
    });
  }
});

/**
 * Get all users (Admin only)
 * @route GET /api/users
 * @access Private (Admin only)
 */
router.get("/", authenticateUser, authorizeRoles("admin"), async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.error("Get all users error:", error);
    res.status(500).json({
      message: "Server error while fetching users",
      error: config.nodeEnv === "development" ? error.message : undefined,
    });
  }
});

module.exports = router;
