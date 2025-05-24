const { OpenAI } = require("openai");
const config = require("../config/config");
const ApiLog = require("../models/ApiLog");
const Course = require("../models/Course");

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

    // Fetch all available courses from the database
    const availableCourses = await Course.find({ isPublished: true }).select(
      "title description category level _id"
    );

    if (availableCourses.length === 0) {
      return {
        recommendations: "No courses are currently available on the platform.",
        tokensUsed: 0,
      };
    }

    // Format courses for the prompt
    const coursesList = availableCourses
      .map((course, index) => {
        return `${index + 1}. ${course.title} (ID: ${
          course._id
        }) - ${course.description.substring(0, 100)}... | Level: ${
          course.level
        } | Category: ${course.category}`;
      })
      .join("\n");

    // Define system message to set context for the GPT model
    const systemMessage = {
      role: "system",
      content: `You are a helpful course recommendation assistant for an online learning platform. 
                Your task is to suggest 3-5 relevant courses from our platform based on the user's learning goals or interests.
                IMPORTANT: You must ONLY recommend courses from the following list of available courses:
                
                ${coursesList}
                
                For each recommendation, include:
                1. The exact course title
                2. The course ID in parentheses (ID: xxxx)
                3. A brief explanation of why you're recommending it based on the user's request
                4. The difficulty level
                
                Format your response as a numbered list. If the user's interests don't match any available courses, suggest the closest matches and explain why they might still be valuable.`,
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
      max_tokens: 800,
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
