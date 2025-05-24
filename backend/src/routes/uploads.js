const express = require("express");
const router = express.Router();
const { uploadImage } = require("../controllers/uploads");
const { authenticateUser } = require("../middleware/auth");
const { upload } = require("../middleware/upload");

// Protected route for image upload
router.post("/image", authenticateUser, upload.single("image"), uploadImage);

module.exports = router;
