import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const ImageUploader = ({ onImageUpload, currentImage }) => {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(currentImage || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);
  const { token } = useAuth();

  // Debug current state
  useEffect(() => {
    if (currentImage) {
      console.log(
        "ImageUploader initialized with existing image:",
        currentImage
      );
    }
  }, []);

  // Automatically upload the image when selected
  useEffect(() => {
    if (image) {
      console.log("Image selected, initiating upload...");
      handleUpload();
    }
  }, [image]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log("File selected:", selectedFile?.name);

    if (selectedFile) {
      // Check file type
      if (!selectedFile.type.match(/image\/(jpeg|jpg|png|gif|webp)/)) {
        setError("Please select a valid image file (JPEG, PNG, GIF, WebP)");
        return;
      }

      // Check file size (5MB max)
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError("Image size should be less than 5MB");
        return;
      }

      // Create a preview
      const reader = new FileReader();
      reader.onload = () => {
        console.log("Preview created");
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);

      // Set the image for upload
      setImage(selectedFile);
      setError("");
    }
  };

  const handleUpload = async () => {
    if (!image) {
      return;
    }

    console.log("Starting upload to Cloudinary...");
    console.log("API URL:", `${API_URL}/uploads/image`);

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("image", image);

      console.log("FormData created with image:", image.name);
      console.log("Token available:", !!token);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      console.log("Sending request to upload image...");
      const response = await axios.post(
        `${API_URL}/uploads/image`,
        formData,
        config
      );

      console.log("Upload response:", response.data);

      if (response.data.success) {
        // Update with the actual URL from Cloudinary
        console.log(
          "Image uploaded successfully to URL:",
          response.data.data.url
        );
        setPreviewUrl(response.data.data.url);
        onImageUpload(response.data.data.url);
        setImage(null);
      }
    } catch (error) {
      console.error("Upload error details:", error.response || error);
      setError(error.response?.data?.message || "Error uploading image");
      // Keep the preview but indicate error
      setPreviewUrl(previewUrl);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {previewUrl && (
        <div className="relative w-full h-48 bg-gray-100 rounded-md overflow-hidden">
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full h-full object-cover"
          />
          <button
            type="button"
            onClick={() => {
              console.log("Removing image");
              setPreviewUrl("");
              setImage(null);
              onImageUpload("");
              if (fileInputRef.current) {
                fileInputRef.current.value = "";
              }
            }}
            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}

      <div className="flex flex-col space-y-2">
        <div className="relative">
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            className={`form-input text-sm ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            ref={fileInputRef}
            disabled={loading}
          />
          {loading && (
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <svg
                className="animate-spin h-5 w-5 text-blue-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
          )}
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <p className="text-xs text-gray-500">
          {loading
            ? "Uploading image..."
            : "Select an image to upload (max 5MB)"}
        </p>
      </div>
    </div>
  );
};

export default ImageUploader;
