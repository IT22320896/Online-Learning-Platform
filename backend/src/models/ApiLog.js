const mongoose = require("mongoose");

const apiLogSchema = new mongoose.Schema(
  {
    endpoint: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    prompt: {
      type: String,
      required: true,
    },
    tokensUsed: {
      type: Number,
      default: 0,
    },
    requestTime: {
      type: Number, // in milliseconds
      default: 0,
    },
    success: {
      type: Boolean,
      default: true,
    },
    errorMessage: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// Static method to get total tokens used
apiLogSchema.statics.getTotalTokensUsed = async function () {
  const result = await this.aggregate([
    {
      $group: {
        _id: null,
        totalTokens: { $sum: "$tokensUsed" },
      },
    },
  ]);
  return result.length > 0 ? result[0].totalTokens : 0;
};

// Static method to get usage by user
apiLogSchema.statics.getUserUsage = async function (userId) {
  const result = await this.aggregate([
    { $match: { userId: mongoose.Types.ObjectId(userId) } },
    {
      $group: {
        _id: "$userId",
        totalTokens: { $sum: "$tokensUsed" },
        requestCount: { $sum: 1 },
      },
    },
  ]);
  return result.length > 0 ? result[0] : { totalTokens: 0, requestCount: 0 };
};

const ApiLog = mongoose.model("ApiLog", apiLogSchema);

module.exports = ApiLog;
