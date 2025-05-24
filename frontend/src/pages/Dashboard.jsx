import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const Dashboard = () => {
  const { user, hasRole } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      if (hasRole("student")) {
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          };

          const response = await axios.get(`${API_URL}/users/courses`, config);
          setEnrolledCourses(response.data.data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching enrolled courses:", error);
          setError("Failed to load enrolled courses");
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, [hasRole]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
        <div className="px-6 py-8 border-b border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h1 className="text-2xl font-bold text-gray-800">
                Welcome, {user?.name}!
              </h1>
              <p className="text-gray-600">
                {hasRole("student")
                  ? "Track your learning progress and explore new courses."
                  : hasRole("instructor")
                  ? "Manage your courses and view your teaching stats."
                  : "Manage the platform and view statistics."}
              </p>
            </div>
            <div>
              {hasRole("student") && (
                <Link
                  to="/recommendations"
                  className="btn-primary flex items-center"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    ></path>
                  </svg>
                  Get Course Recommendations
                </Link>
              )}
              {hasRole("instructor") && (
                <Link
                  to="/instructor/dashboard"
                  className="btn-primary flex items-center"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    ></path>
                  </svg>
                  Instructor Dashboard
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="px-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h2 className="text-lg font-semibold mb-2">Your Profile</h2>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Name:</span> {user?.name}
                </p>
                <p>
                  <span className="font-medium">Email:</span> {user?.email}
                </p>
                <p>
                  <span className="font-medium">Role:</span>{" "}
                  {user?.role.charAt(0).toUpperCase() + user?.role.slice(1)}
                </p>
              </div>
            </div>

            {hasRole("student") && (
              <div className="p-4 bg-green-50 rounded-lg">
                <h2 className="text-lg font-semibold mb-2">Learning Stats</h2>
                <div className="space-y-2">
                  <p>
                    <span className="font-medium">Courses Enrolled:</span>{" "}
                    {enrolledCourses.length}
                  </p>
                  <p>
                    <span className="font-medium">Last Login:</span>{" "}
                    {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {hasRole("student") && (
        <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">
              Your Enrolled Courses
            </h2>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : error ? (
              <div className="p-4 text-red-700 bg-red-100 rounded-lg text-center">
                {error}
              </div>
            ) : enrolledCourses.length > 0 ? (
              <div className="space-y-4">
                {enrolledCourses.slice(0, 3).map((course) => (
                  <div
                    key={course._id}
                    className="border rounded-lg p-4 hover:shadow-md transition duration-200"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <Link
                          to={`/courses/${course._id}`}
                          className="text-lg font-semibold text-blue-600 hover:text-blue-800"
                        >
                          {course.title}
                        </Link>
                        <p className="text-gray-600 text-sm mt-1">
                          {course.description.substring(0, 100)}...
                        </p>
                      </div>
                      <Link
                        to={`/courses/${course._id}`}
                        className="mt-3 md:mt-0 btn-secondary text-center md:text-left"
                      >
                        Continue Learning
                      </Link>
                    </div>
                  </div>
                ))}

                {enrolledCourses.length > 3 && (
                  <div className="text-center mt-4">
                    <Link
                      to="/enrolled-courses"
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      View all enrolled courses ({enrolledCourses.length})
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">
                  You are not enrolled in any courses yet.
                </p>
                <Link to="/courses" className="btn-primary">
                  Browse Courses
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Quick Links</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              to="/courses"
              className="p-4 border rounded-lg hover:bg-gray-50 transition duration-200 flex items-center"
            >
              <svg
                className="w-6 h-6 mr-3 text-blue-500"
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
              Browse Courses
            </Link>

            {hasRole("student") && (
              <Link
                to="/enrolled-courses"
                className="p-4 border rounded-lg hover:bg-gray-50 transition duration-200 flex items-center"
              >
                <svg
                  className="w-6 h-6 mr-3 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                My Courses
              </Link>
            )}

            {hasRole("instructor") && (
              <Link
                to="/instructor/create-course"
                className="p-4 border rounded-lg hover:bg-gray-50 transition duration-200 flex items-center"
              >
                <svg
                  className="w-6 h-6 mr-3 text-purple-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  ></path>
                </svg>
                Create New Course
              </Link>
            )}

            <Link
              to="/recommendations"
              className="p-4 border rounded-lg hover:bg-gray-50 transition duration-200 flex items-center"
            >
              <svg
                className="w-6 h-6 mr-3 text-yellow-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                ></path>
              </svg>
              Get Recommendations
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
