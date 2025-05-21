const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Course title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Course description is required"],
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Instructor is required"],
    },
    thumbnail: {
      type: String,
      default: "https://via.placeholder.com/350x150",
    },
    content: {
      type: String,
      required: [true, "Course content is required"],
    },
    duration: {
      type: Number, // in minutes
      default: 60,
    },
    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },
    category: {
      type: String,
      required: [true, "Course category is required"],
      trim: true,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    enrolled: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    rating: {
      average: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        rating: {
          type: Number,
          required: true,
          min: 1,
          max: 5,
        },
        comment: {
          type: String,
          required: true,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Virtual for enrolledCount
courseSchema.virtual("enrolledCount").get(function () {
  return this.enrolled.length;
});

// Add index for searching
courseSchema.index({
  title: "text",
  description: "text",
  category: "text",
  tags: "text",
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
