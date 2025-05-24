const { OpenAI } = require("openai");
const config = require("../config/config");
const ApiLog = require("../models/ApiLog");

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: config.openaiApiKey,
});

/**
 * Course recommendation service with API logging
 * @param {string} prompt - User prompt for course recommendations
 * @param {string} userId - User ID for tracking
 * @returns {Promise<{recommendations: string, tokensUsed: number}>}
 */
exports.getCourseRecommendations = async (prompt, userId) => {
  const startTime = Date.now();
  let success = true;
  let errorMessage = "";
  let tokensUsed = 0;

  try {
    if (!config.openaiApiKey) {
      throw new Error("OpenAI API key is not configured");
    }

    // Define system message to set context for the GPT model
    const systemMessage = {
      role: "system",
      content: `You are a helpful course recommendation assistant for an online learning platform. 
                Your task is to suggest relevant courses based on the user's learning goals or interests.
                Provide course titles, a brief description for each, and the difficulty level.
                Return exactly 3-5 course recommendations.`,
    };

    // User's message
    const userMessage = {
      role: "user",
      content: prompt,
    };

    // Make API call
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [systemMessage, userMessage],
      max_tokens: 500,
      temperature: 0.7,
    });

    // Extract tokens used
    tokensUsed = response.usage.total_tokens;

    // Return the response content
    return {
      recommendations: response.choices[0].message.content,
      tokensUsed,
    };
  } catch (error) {
    console.error("OpenAI API error:", error);
    success = false;
    errorMessage = error.message;
    throw error;
  } finally {
    // Log the API call
    try {
      await ApiLog.create({
        endpoint: "course-recommendations",
        userId,
        prompt,
        tokensUsed,
        requestTime: Date.now() - startTime,
        success,
        errorMessage,
      });
    } catch (logError) {
      console.error("Error logging API call:", logError);
    }
  }
};

/**
 * Get API usage statistics
 * @returns {Promise<{totalTokens: number, requestCount: number}>}
 */
exports.getApiUsageStats = async () => {
  try {
    const totalTokens = await ApiLog.getTotalTokensUsed();
    const requestCount = await ApiLog.countDocuments();

    return { totalTokens, requestCount };
  } catch (error) {
    console.error("Error getting API usage stats:", error);
    throw error;
  }
};
