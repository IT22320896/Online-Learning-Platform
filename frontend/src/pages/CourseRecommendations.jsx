import { useState, useEffect } from "react";
import CourseRecommender from "../components/gpt/CourseRecommender";
import { Link } from "react-router-dom";
import axios from "axios";
import CourseCard from "../components/courses/CourseCard";
import { useAuth } from "../contexts/AuthContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const CourseRecommendations = () => {
  const { token } = useAuth();
  const [popularCourses, setPopularCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPopularCourses = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(
          `${API_URL}/courses?sort=popular&limit=3`,
          config
        );
        setPopularCourses(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching popular courses:", error);
        setError("Failed to load popular courses");
        setLoading(false);
      }
    };

    fetchPopularCourses();
  }, [token]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Course Recommendations
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Tell us what you're interested in learning, and we'll suggest courses
          that match your goals. Our AI-powered recommendation engine will help
          you find the perfect courses to enhance your skills.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <CourseRecommender />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Popular Courses
          </h2>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="p-4 text-red-700 bg-red-100 rounded-lg text-center">
              {error}
            </div>
          ) : (
            <div className="space-y-6">
              {popularCourses.length > 0 ? (
                popularCourses.map((course) => (
                  <div
                    key={course._id}
                    className="border-b pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0"
                  >
                    <Link
                      to={`/courses/${course._id}`}
                      className="hover:text-blue-600"
                    >
                      <h3 className="font-semibold text-lg mb-1">
                        {course.title}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {course.description}
                    </p>
                    <div className="flex justify-between items-center text-xs">
                      <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded">
                        {course.category}
                      </span>
                      <span className="text-gray-500">
                        {course.enrolled?.length || 0} students
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-600">
                  No popular courses available.
                </p>
              )}

              <Link
                to="/courses"
                className="block text-center text-blue-600 hover:text-blue-800 font-medium mt-4"
              >
                Browse all courses
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="bg-blue-50 p-6 rounded-lg mb-12">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          How our recommendation system works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded shadow-sm">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-3">
              <span className="font-bold">1</span>
            </div>
            <h3 className="font-medium mb-2">Share your learning goals</h3>
            <p className="text-sm text-gray-600">
              Tell us what you want to learn or what career path you're
              interested in.
            </p>
          </div>

          <div className="bg-white p-4 rounded shadow-sm">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-3">
              <span className="font-bold">2</span>
            </div>
            <h3 className="font-medium mb-2">AI-powered analysis</h3>
            <p className="text-sm text-gray-600">
              Our system analyzes your goals and matches them with relevant
              courses.
            </p>
          </div>

          <div className="bg-white p-4 rounded shadow-sm">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-3">
              <span className="font-bold">3</span>
            </div>
            <h3 className="font-medium mb-2">Personalized recommendations</h3>
            <p className="text-sm text-gray-600">
              Get customized course suggestions that align with your specific
              interests.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseRecommendations;
