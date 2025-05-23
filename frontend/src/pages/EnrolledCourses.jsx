import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const EnrolledCourses = () => {
  const { token } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(`${API_URL}/users/courses`, config);
        setEnrolledCourses(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching enrolled courses:", error);
        setError("Failed to load your enrolled courses");
        setLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, [token]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          My Enrolled Courses
        </h1>
        <p className="text-gray-600">
          Access all the courses you've enrolled in and continue your learning
          journey.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 text-red-700 bg-red-100 rounded-lg">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : enrolledCourses.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <svg
            className="mx-auto h-16 w-16 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            ></path>
          </svg>
          <h2 className="mt-4 text-xl font-semibold text-gray-800">
            You haven't enrolled in any courses yet
          </h2>
          <p className="mt-2 text-gray-600 mb-6">
            Explore our course catalog and enroll in courses that interest you.
          </p>
          <Link to="/courses" className="btn-primary">
            Browse Courses
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {enrolledCourses.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="md:flex">
                <div className="md:flex-shrink-0">
                  <img
                    src={
                      course.thumbnail ||
                      "https://via.placeholder.com/300x200?text=Course+Image"
                    }
                    alt={course.title}
                    className="h-48 w-full object-cover md:w-64"
                  />
                </div>
                <div className="p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded-full ${
                          course.level === "beginner"
                            ? "bg-green-100 text-green-800"
                            : course.level === "intermediate"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {course.level.charAt(0).toUpperCase() +
                          course.level.slice(1)}
                      </span>
                      <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {course.category}
                      </span>
                    </div>

                    <Link to={`/courses/${course._id}`}>
                      <h2 className="text-xl font-bold text-gray-800 mb-2 hover:text-blue-600 transition-colors">
                        {course.title}
                      </h2>
                    </Link>
                    <p className="text-gray-600 mb-4">{course.description}</p>

                    <div className="flex items-center mb-4">
                      <div className="mr-2 flex">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.round(course.rating?.average || 0)
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        {course.rating?.average.toFixed(1) || "0.0"} (
                        {course.rating?.count || 0} reviews)
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      to={`/courses/${course._id}`}
                      className="btn-primary flex-grow text-center"
                    >
                      Continue Learning
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnrolledCourses;
