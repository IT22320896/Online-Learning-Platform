const {
  getCourseRecommendations,
  getApiUsageStats,
} = require("../utils/openai");
const config = require("../config/config");

/**
 * Get course recommendations from GPT
 * @route POST /api/gpt/recommendations
 * @access Private
 */
exports.getCourseRecommendations = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        message: "Please provide a prompt for course recommendations",
      });
    }

    // Call OpenAI API with logging
    const { recommendations, tokensUsed } = await getCourseRecommendations(
      prompt,
      req.user._id
    );

    res.status(200).json({
      success: true,
      data: {
        recommendations,
        tokensUsed,
      },
    });
  } catch (error) {
    console.error("GPT recommendation error:", error);
    res.status(500).json({
      message: "Error getting course recommendations",
      error: config.nodeEnv === "development" ? error.message : "Server error",
    });
  }
};

/**
 * Get API usage statistics (Admin only)
 * @route GET /api/gpt/stats
 * @access Private (Admin only)
 */
exports.getApiUsageStats = async (req, res) => {
  try {
    const stats = await getApiUsageStats();

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error("Get API stats error:", error);
    res.status(500).json({
      message: "Error getting API usage statistics",
      error: config.nodeEnv === "development" ? error.message : "Server error",
    });
  }
};
