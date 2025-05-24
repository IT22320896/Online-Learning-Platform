const cloudinary = require("../config/cloudinary");
const fs = require("fs");
const path = require("path");
const config = require("../config/config");

/**
 * Upload image to Cloudinary
 * @route POST /api/uploads
 * @access Private
 */
exports.uploadImage = async (req, res) => {
  console.log("Upload endpoint called");

  try {
    // Check if file exists
    console.log("Request file:", req.file);
    console.log("Request body:", req.body);

    if (!req.file) {
      console.log("No file in request");
      return res.status(400).json({
        success: false,
        message: "Please upload an image file",
      });
    }

    console.log(
      "File received:",
      req.file.originalname,
      req.file.size,
      "bytes"
    );
    console.log("File path:", req.file.path);

    // Upload to cloudinary
    console.log("Uploading to Cloudinary...");
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "courses",
      use_filename: true,
      unique_filename: true,
    });

    console.log("Cloudinary response:", result);

    // Remove file from local storage
    fs.unlink(req.file.path, (err) => {
      if (err) console.error("Error deleting local file:", err);
      else console.log("Local file deleted successfully");
    });

    // Return success response
    console.log("Sending successful response with URL:", result.secure_url);
    res.status(200).json({
      success: true,
      data: {
        url: result.secure_url,
        public_id: result.public_id,
      },
    });
  } catch (error) {
    console.error("Image upload error:", error);
    res.status(500).json({
      success: false,
      message: "Error uploading image",
      error: config.nodeEnv === "development" ? error.message : undefined,
    });
  }
};
