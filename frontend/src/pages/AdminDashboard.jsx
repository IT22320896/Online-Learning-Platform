import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const AdminDashboard = () => {
  const { user, hasRole } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [stats, setStats] = useState({
    courses: {
      total: 0,
      published: 0,
      unpublished: 0,
    },
    users: {
      total: 0,
      students: 0,
      instructors: 0,
    },
    gptUsage: {
      totalTokens: 0,
      requestCount: 0,
      costEstimate: 0,
    },
  });

  useEffect(() => {
    if (!hasRole("admin")) {
      setError("Access denied. Admin privileges required.");
      setLoading(false);
      return;
    }

    const fetchAdminStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        // Execute all requests in parallel
        const [coursesResponse, usersResponse, gptStatsResponse] =
          await Promise.all([
            axios.get(`${API_URL}/courses?limit=1000`, config),
            axios.get(`${API_URL}/users/stats`, config),
            axios.get(`${API_URL}/gpt/stats`, config),
          ]);

        // Process courses data
        const courses = coursesResponse.data.data;
        const publishedCourses = courses.filter((course) => course.isPublished);

        // Calculate GPT cost estimate (based on current OpenAI pricing)
        // $0.0015 per 1000 tokens for gpt-3.5-turbo
        const costEstimate =
          (gptStatsResponse.data.data.totalTokens / 1000) * 0.0015;

        setStats({
          courses: {
            total: courses.length,
            published: publishedCourses.length,
            unpublished: courses.length - publishedCourses.length,
          },
          users: {
            total: usersResponse.data.data.total,
            students: usersResponse.data.data.students,
            instructors: usersResponse.data.data.instructors,
          },
          gptUsage: {
            totalTokens: gptStatsResponse.data.data.totalTokens,
            requestCount: gptStatsResponse.data.data.requestCount,
            costEstimate: costEstimate.toFixed(2),
          },
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching admin stats:", error);
        setError("Failed to load admin statistics");
        setLoading(false);
      }
    };

    fetchAdminStats();
  }, [hasRole]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="p-6 bg-red-50 border border-red-200 rounded-lg shadow-sm mb-6">
          <div className="flex items-center">
            <svg
              className="w-8 h-8 text-red-500 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <h2 className="text-xl font-bold text-red-700">Error</h2>
          </div>
          <p className="mt-2 text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">Welcome back, {user?.name}</p>
        </div>

        {/* Main Stats Cards */}
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Platform Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Courses Stats */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-700">Courses</h3>
                <div className="p-2 bg-blue-100 rounded-md">
                  <svg
                    className="w-6 h-6 text-blue-600"
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
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-4">
                {stats.courses.total}
              </div>
              <div className="flex justify-between text-sm">
                <div>
                  <span className="text-green-500 font-medium">
                    {stats.courses.published}
                  </span>{" "}
                  Published
                </div>
                <div>
                  <span className="text-yellow-500 font-medium">
                    {stats.courses.unpublished}
                  </span>{" "}
                  Unpublished
                </div>
              </div>
            </div>

            {/* Users Stats */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-700">Users</h3>
                <div className="p-2 bg-purple-100 rounded-md">
                  <svg
                    className="w-6 h-6 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    ></path>
                  </svg>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-4">
                {stats.users.total}
              </div>
              <div className="flex justify-between text-sm">
                <div>
                  <span className="text-blue-500 font-medium">
                    {stats.users.students}
                  </span>{" "}
                  Students
                </div>
                <div>
                  <span className="text-indigo-500 font-medium">
                    {stats.users.instructors}
                  </span>{" "}
                  Instructors
                </div>
              </div>
            </div>

            {/* GPT Usage Stats */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-700">
                  GPT API Usage
                </h3>
                <div className="p-2 bg-green-100 rounded-md">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                    ></path>
                  </svg>
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-4">
                {stats.gptUsage.totalTokens.toLocaleString()}
              </div>
              <div className="flex justify-between text-sm">
                <div>
                  <span className="text-teal-500 font-medium">
                    {stats.gptUsage.requestCount}
                  </span>{" "}
                  Requests
                </div>
                <div>
                  <span className="text-gray-500 font-medium">
                    ${stats.gptUsage.costEstimate}
                  </span>{" "}
                  Est. Cost
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Stats and Management Tools */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Courses */}
          <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-2">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Recent Activity
            </h3>
            <p className="text-gray-500 text-sm">
              Detailed activity analytics will be implemented in future updates.
            </p>
            <div className="mt-4">
              <Link
                to="/courses"
                className="text-blue-600 hover:text-blue-800 font-semibold text-sm flex items-center"
              >
                View all courses
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              </Link>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Quick Actions
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/courses"
                  className="flex items-center p-3 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
                >
                  <svg
                    className="w-5 h-5 text-blue-600 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    ></path>
                  </svg>
                  View All Courses
                </Link>
              </li>
              <li>
                <button
                  className="w-full flex items-center p-3 bg-purple-50 rounded-md hover:bg-purple-100 transition-colors"
                  onClick={() => alert("Feature coming soon!")}
                >
                  <svg
                    className="w-5 h-5 text-purple-600 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    ></path>
                  </svg>
                  Manage Users
                </button>
              </li>
              <li>
                <button
                  className="w-full flex items-center p-3 bg-green-50 rounded-md hover:bg-green-100 transition-colors"
                  onClick={() => alert("Feature coming soon!")}
                >
                  <svg
                    className="w-5 h-5 text-green-600 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    ></path>
                  </svg>
                  Generate Reports
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
