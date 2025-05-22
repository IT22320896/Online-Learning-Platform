require("dotenv").config();

const config = {
  port: process.env.PORT || 5000,
  mongoUri:
    process.env.MONGODB_URI,
  jwtSecret:
    process.env.JWT_SECRET,
  nodeEnv: process.env.NODE_ENV,
  openaiApiKey: process.env.OPENAI_API_KEY,
};

module.exports = config;
