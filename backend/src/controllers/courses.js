const Course = require("../models/Course");
const User = require("../models/User");
const config = require("../config/config");

/**
 * Get all courses
 * @route GET /api/courses
 * @access Public
 */
exports.getAllCourses = async (req, res) => {
  try {
    const { category, level, search } = req.query;

    // Build query object
    const query = {};

    if (category) {
      query.category = category;
    }

    if (level) {
      query.level = level;
    }

    if (search) {
      query.$text = { $search: search };
    }

    // Only return published courses
    query.isPublished = true;

    const courses = await Course.find(query)
      .populate("instructor", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses,
    });
  } catch (error) {
    console.error("Get all courses error:", error);
    res.status(500).json({
      message: "Server error while fetching courses",
      error: config.nodeEnv === "development" ? error.message : undefined,
    });
  }
};

/**
 * Get course by ID
 * @route GET /api/courses/:id
 * @access Public
 */
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate("instructor", "name email bio")
      .populate("reviews.user", "name");

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    console.error("Get course by ID error:", error);
    res.status(500).json({
      message: "Server error while fetching course",
      error: config.nodeEnv === "development" ? error.message : undefined,
    });
  }
};

/**
 * Create new course
 * @route POST /api/courses
 * @access Private (Instructors only)
 */
exports.createCourse = async (req, res) => {
  try {
    // Add instructor to course
    req.body.instructor = req.user._id;

    const course = await Course.create(req.body);

    // Add course to instructor's createdCourses
    await User.findByIdAndUpdate(req.user._id, {
      $push: { createdCourses: course._id },
    });

    res.status(201).json({
      success: true,
      data: course,
    });
  } catch (error) {
    console.error("Create course error:", error);

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        message: messages.join(", "),
      });
    }

    res.status(500).json({
      message: "Server error while creating course",
      error: config.nodeEnv === "development" ? error.message : undefined,
    });
  }
};

/**
 * Update course
 * @route PUT /api/courses/:id
 * @access Private (Course instructor only)
 */
exports.updateCourse = async (req, res) => {
  try {
    let course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    // Check if user is the course instructor
    if (course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized to update this course",
      });
    }

    // Update course
    course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    console.error("Update course error:", error);

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        message: messages.join(", "),
      });
    }

    res.status(500).json({
      message: "Server error while updating course",
      error: config.nodeEnv === "development" ? error.message : undefined,
    });
  }
};

/**
 * Delete course
 * @route DELETE /api/courses/:id
 * @access Private (Course instructor only)
 */
exports.deleteCourse = async (req, res) => {
  try {
    let course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    // Check if user is the course instructor
    if (course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized to delete this course",
      });
    }

    // Remove course
    await Course.findByIdAndDelete(req.params.id);

    // Remove course from instructor's createdCourses
    await User.findByIdAndUpdate(req.user._id, {
      $pull: { createdCourses: req.params.id },
    });

    // Remove course from enrolled users' enrolledCourses
    await User.updateMany(
      { enrolledCourses: req.params.id },
      { $pull: { enrolledCourses: req.params.id } }
    );

    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.error("Delete course error:", error);
    res.status(500).json({
      message: "Server error while deleting course",
      error: config.nodeEnv === "development" ? error.message : undefined,
    });
  }
};
