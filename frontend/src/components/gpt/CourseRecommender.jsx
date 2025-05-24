import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const CourseRecommender = () => {
  const { token } = useAuth();
  const [prompt, setPrompt] = useState("");
  const [recommendations, setRecommendations] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tokensUsed, setTokensUsed] = useState(0);

  const getRecommendations = async (e) => {
    e.preventDefault();

    if (!prompt.trim()) {
      setError("Please enter a prompt");
      return;
    }

    setLoading(true);
    setError("");
    setRecommendations("");

    try {
      // Configure headers with authentication token
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      // Make request to GPT API
      const response = await axios.post(
        `${API_URL}/gpt/recommendations`,
        { prompt },
        config
      );

      setRecommendations(response.data.data.recommendations);
      setTokensUsed(response.data.data.tokensUsed);
    } catch (error) {
      console.error("Error getting recommendations:", error);
      setError(
        error.response?.data?.message || "Error fetching recommendations"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Get Course Recommendations
      </h2>

      <form onSubmit={getRecommendations}>
        <div className="mb-4">
          <label
            htmlFor="prompt"
            className="block text-gray-700 font-medium mb-2"
          >
            What would you like to learn?
          </label>
          <textarea
            id="prompt"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            placeholder="e.g., I want to become a software engineer, what courses should I take?"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 flex justify-center items-center"
          disabled={loading}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
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
              Getting Recommendations...
            </>
          ) : (
            "Get Recommendations"
          )}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {recommendations && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">
              Recommended Courses
            </h3>
            <span className="text-xs text-gray-500">
              Tokens used: {tokensUsed}
            </span>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="prose max-w-none">
              {recommendations.split("\n").map((line, index) => (
                <p key={index} className={line.trim() === "" ? "my-4" : ""}>
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseRecommender;
